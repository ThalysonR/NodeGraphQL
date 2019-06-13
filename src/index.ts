import express from 'express';
import pdfMake from 'pdfmake/build/pdfmake.js';
import vfs_fonts from 'pdfmake/build/vfs_fonts.js';
import apolloServer from './app';
import getConfig from './environment/datasources.config';
import { CatalogoAPI, PedidoService, PessoaApi } from './graphql/resources/datasources';
import { getDbConnection } from './models';
import { normalizePort } from './utils/utils';

const port = normalizePort(process.env.port || 3000);
const host = process.env.host || '127.0.0.1';

// const router = express.Router();

// const pedido = router.route('/pedido');

getDbConnection()
  .sequelize.sync()
  .then(() => {
    // apolloServer
    //   .listen(port, host)
    //   .then(({ url }) => {
    //     console.log(`🚀Server ready at ${url}`);
    //   })
    // .catch(onError);
    const app = express();

    app.get('/pedido', async (req, res) => {
      try {
        pdfMake.vfs = vfs_fonts.pdfMake.vfs;

        const pessoaAPI = new PessoaApi(getConfig());
        // @ts-ignore
        pessoaAPI.initialize({});
        const pessoa = await pessoaAPI.searchPessoa(req.query.cpfCnpj);

        const buscaPedido = {
          codcliente: pessoa.clientes.id,
          codpedido: req.query.codPedido,
        };

        const pedidoService = new PedidoService(getDbConnection());
        // @ts-ignore
        pedidoService.initialize({});

        const resp = await pedidoService.findPedidoByCliente(buscaPedido);

        const param: any = [];

        resp.forEach(value => {
          value.itens.forEach(res => {
            param.push(res.fornecedor_emp + '___' + res.fornecedor_cod + '___' + res.produto);
          });
        });

        const catalogoApi = new CatalogoAPI(getConfig());
        // @ts-ignore
        catalogoApi.initialize({});

        const produto = await catalogoApi.searchProductName(param);

        let docDefinition;
        const test: any = [
          [
            { text: 'FORN', style: 'tableHeader' },
            { text: 'PRODUTO', style: 'tableHeader' },
            { text: 'QTDE', style: 'tableHeader' },
            { text: 'LIQUIDO', style: 'tableHeader' },
            { text: 'TOTAL', style: 'tableHeader' },
            { text: 'DESCRICAO', style: 'tableHeader' },
          ],
        ];

        produto.forEach(value => {
          resp.forEach(res => {
            res.itens.forEach(produto => {
              const condicao =
                produto.fornecedor_emp + '___' + produto.fornecedor_cod + '___' + produto.produto;

              if (condicao === value.codigo) {
                test.push([
                  '' + produto.fornecedor_cod,
                  produto.produto,
                  '' + produto.quantidade,
                  '' + produto.vl_item,
                  '' + produto.vl_total,
                  value.nome,
                ]);
              }
            });
          });
        });

        docDefinition = {
          content: [
            {
              text: 'Emissão: ' + new Date().toLocaleString(),
              style: 'data',
              alignment: 'right',
            },
            {
              image:
                'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAa4AAAC4CAYAAAC7DQioAAAACXBIWXMAAAsSAAALEgHS3X78AAAgAElEQVR4nO2dzW9b2XnGjyeDBIOGsGaQIIGbIBIGSJM2iCUi3rQJLGkxC6Ko5E2aRQOJy65kdUOwXchaGV5J+gcqetmV6Cy0KFCKRppVAIkTdJFNYA5aDFqkyDBQiiABghSHfo7m+N5zLi+p+/Gee58fYIyHpHm/Ds9z3o/zvncUyZVGs7WklHqslNpTSo2VUvvXl+dD3nVCCFkMCleONJqtXaXUgVJqOXKUnlLq8PryfFypCyaEkAKgcOVAo9laVUodKaXWE759opQ6UUodX1+eT2LvEkIIcULhyhC4BbVg7c7xrWNYX73YO4QQQmJQuDKi0Ww9QRxracFvHCL+NYq9Qwgh5AYK1y1pNFvaHXjqiGMtyjEsMLoPCSHEAYVrQRrN1jIEKymOtSgTiNex1OsnhJCyoHDNCeJYB0hxzxsd/2ozfZ4QQj6FwjUHSG8/ukUca1GGEDCmzxNCag+FKwWIY2nBWi35VA6ZPk8IqTsUrgQQx9KCte3/VOFMkH3I9HlCSC2hcDmIlGkq2i2YlhHLRxFC6giFK0JCmSap9CFgjH8RQmoBhQsgjnWQU3p73rB8FCGkNtReuBYs0yQVlo8ihFSeWgtXBmWapDKEgDH+RQipHLUUrkaztQ0rK5Q41qL0EP+i+5AQUhlqJVwp241UjWn86/ry/EmNrpkQUmFqIVwFl2mSium+3K/xPSCEVIDKC1ej2XoM0apaHGtRWD6KEBI0lRWuHNqNVA22TyGEBEnlhCvndiNVg+1TCCHBURnhsso0HcTeJLNg+xRCSDBUQrhKbDdSNVg+ihAinqCFS1C7karB9imEELEEKVyIYx0IKtPUR7zotuczhtUowXJk+xRCiEjeCumx6DgWyjRdCREt3Vpk4/ry/JFS6qPYu/OjhWsFFk/ZaPE8bTRbV7BsCSFEBMEIF+JYV0L2ZBlrZC3rhAbtnkOVixVYcmWj3bAXjWbrFJYuIYSUytvSb7/AMk2F7H9CgsQjQXE8vXDYbjRbbJ8SARmtUuOsoyKfFRY3ZS1w9KJvFHt1AUr2MiQ+s5p7QMZ6bhQrXALbjZRScQIW3ZqQCiCmdNZOo9li+5RPmVqlsVeF0Gi2zIlM4N4ew7U9zGELxG6JW1L09b0be3VOIL5lPs8NzDc+xI61AtBhlCciXYWIY70SIlpjxLE2ykwTxybhFVh8ZbOM+NcFLGISBkvwXBhx0c/vj41m60y74rFYDJmljMYjY7rCESVcut1Io9l6JSiOpa2KFSkbcxH/2oeASTgn/QO/QvyLe+jCZRvVZl7pRWPgzzIL0dmKvUJEIUK4tGmuV+9KqTMhtQW1C2xFaisQbflpCxAuBQmbhXfNpBd7h4SEcQW/QjJUiDzM4JxpcQmnVOFCevsR3IISBss0nnR9ed5OCo5KQVuC2iKE37fs851OetpiZvp88CxZruDQrK9bjT24Guk9EE5pwoVkg1dCemRNM/gQx8okK6lIrPR5CckSy4idXDB9PniMKzikOOZt41xcdAVA4cKlV+OIY0moLTiBtbIWeoNFxL/a+loExb+09XXE+FfQmIVISIuQ7dgr6cnC1UhypjDhQhzrDKmcUuJYWrCeVGlPkrYYEf9qC4l/PYaA1bn7dOjohcdZQAuQ24gPLa4AyF24rDJNr265EsqKIdLbK90FGHus1gTFv45YPipoVpF5GAILjTHGt8IhV+FCZtIrIT2yJthAvFGXvlNW+ag1IfEvUz7qjPGvINkOZeGx4HlyURUIuQgX4lgXWKFJWMEcIr29lpUekD7fRvq8hOST7YrsGaojVba6GN8KhEyFC3GsU8SxJKxe+mY/Fmvr3aTPryH+JeF+hL5nqI4sB/K8FhEhWlyBkIlwCWw3Yso0PWI33ziwPKW1T7lg/CsYdgI40bnGEsYerf9AuLVw4YFfCGs3IqZMk1QEtk9ZZ/wrGNZDeEZzLoS4aAqIhYUrkt4uYYPiMdyCEorQBgPiX48ElY/a5v6vIJCQITyLeWoOMr4VEHMLV8QtKCW9XQvWPuNYi2OVj9oXEv96zPiXaEKY6GlxVZS5hEtYF2K7TBPjWBkhrH2KiX9x/5c8Qngeq2msdo6toJhmRadqJCmsC7G2Bk6kVm6vArBc99Ht+FTAczf7v/qIYdZxoaKv+XnsVaXuQ+CL7jysPS9LAXg51lPEcClcYdA2pfkShUtgF+IeJi66BAsAArGh+6RhHJQdkN/GJlidDXlcs3EwnrVYw+/1cYEb/leF1MVM4mEK4QotvrURe6U4jkrKaWjb+3C9woU41p6QFNEhBCu4yu1VAKucvqAxoSfmHS1gdd1U7gJCrjd1j9DbLm9CSJ5JY00FZXGVlTGNPbqli5ZyxbiEdSEeW2WaKFolI7B9Cvd/OcBCo4g9eiG0O0mMc3HspAOiVYbnzbk4vREuYV2I7XYjsZMm5WG1T9kQ1D5Fi9dp0gRVQ/i7+ZQkcWKb/hmUKFo9n3v8LYFdiCvZbqRqIH1eUvuUXVP/MPZODWGm7RskiRMtrgRKFq127FXwlqAuxKM6tBupGgLbpxxgYzwhBqc4wUIPqbtzoWARKE60FIRLQpkmLVZrLNMUJpH2KRLKR9FlSGyWPSWqnIJGbvbsltGOaqZoKVdyRsHUut1I1YiUj2IyTYkUVHEkJFe+S6RY5skBxk4Z7WtSiZYqUbiGbDdSXQS2T6kVcIEVsVoOaXHiEimXmNWaEERLlSBcpt0IyzTVAGHtU2oB0ruvCsoMDtbiYnwrTomiNUKN1NR4NyBnzAT5+KzcXjOsTbE9IeWjKoU1Aa8ie66w+xvY3sppnMtaMHMcWpQsWhvzet6KEK5jiBZdRjXGKh+1jh8Ie27Nh+6B9UdB5xNiItW6tb/N5TqsJdZvsmgWEi2Vs6twiP1YrC1IbhDYPoUsxssA75u9n4sW16cF1MvYPrKwaKmchMtuN8LMMuLEap/CjNIwkbDtYV6mYoXU+NrHtyBaFyVsH7mVaKmMhcvEsVZM6XlCkrDKR60F6nqqK+NAF6VLmKxrb22FLFoqK+H64lfemTz44MtrvrpShCShJ0Ftof/lX9/rf+PBewmfJEJw9QULhfW6x7dKFK0JvHG3DhHcKjmj8d5n1Xf/5p5a+dZdfQOuHnzQPXy2+ZSZg2QuOoPuG41K773/J+onLz5Wv/vtH3gj5TEpoTv2KEPX3sMMv2sYmvVWsmhltg1qIeH63DufUd/+3hfVgw++ZL88bTrZGXR1v6b2s82ndP2QRDqDrrNR6Te+855a+Yu76qf/+j/qZz/+ZdJXkOI5KSHZapKheK1nOGm/DEm4sHWiTNHKzL08t6tQu3L+7h+/GRUtGx34vOgMumedQZcpz8RJZ9B9ggLPztJEenH03a176of/9E31p+9/PvY+KYVxCdaWIauFcJaTdjCL8yqJlprH4tKTx19t3VNfuPdO7D0P0zbrnUF32mb92eZTpj4TLVjbsLJSLWoa735Wbf39++rjX/xG/du//Ke6/tXvY58hhdEucWvLSyFdLG7QWzsazVbsdWlYolV0JmUuoqXSWFw6jrX5g69OJ485RMtG10x71Rl0nStrUg+09d0ZdBduVHrv/c+rH04t/S9PrTFSOO0yuzcIzFQOwtqqomipJIvLxLG+/b0vZDFR6Jt3ivjXPuNf9QFxrIOsVsvaRa3H5E9+9LH6+U9/FXuf5EJPSAcHSckQ4jdglyhaKk/RUj6LS8exvv8PX59OEhmvblcR/zpl/Kv6dAbdx3k0KtVjcvNvvzodo4x/5c7xPFW7c0aSWIjeq1qyaLXz3uf3hsWlXYE6IH4v/8lgF/GvE8a/qkdn0C2kHqEer9qF/eo/fq3+/UcfM/6VLfo3uS+sV96wpOaGUSYBbMA+K1G0ch8zU4truoL9wesVbAGiZTAupCvGv6oB4lhnWOkVZlGvfOuu+v7+1xn/yg5TZ1RUOS5BHdJFhzoazVZZXRgKES3N29rC+rPvvFfmD34Z8a8dxL9Y3zAwEMd6XOZqWI9f7dr+xoN31c9/+okaXMY+QmYzhpUl2Q0mIc4lNr4F0SrDEChMtDRv6QQMIavUdVhfp5gISQDAWn4lxIUzTZ9P2GNI4kxQ6HgjkDqjEkRDpMVVF9FSSVmFJXIT/3q2+ZS1D4WCONYBC5YGxwQT74c6wSDAYrllx7lExrfqJFpKqHApE/+y3IesNi8EZIMelPQjqTPjWxS3HZmySaH3xhOw6VectVWiaB2XFQeVKlwGPUnq0lFD1D/MpEAjmR8rjrVXQtkY8rqVCD0Qr+mjMk8ZiIpvNZqtJyWJlt7btx97tSCc+7gEso7qG0eMfxUPyjRdwdLi/SdlU6Z4iLG4Gs3Wbklu017Ze/tCES7DYwiYqJplVUW3G7lNmSZCcqIs8RDTQBOidRp7I39KFy0VoHApq33KFRIESMZoq1Znd8LK4j0mooB4lBGrE2Ft1V20VKDCZVhl+5TsmdVuhBAhlCEipce3KFqvkZ6ckQa2T8mAoso0EZIRL0tI0CjV4ipRtPqSREtVRLgMOki51xl0dfq8qFI1koG1WlaJGEIWpWgRGWfVdn4RGs3WekmipVluNFsXsVdLJCvh0j7nFwKqJyxZ5aMO2T7FT9btRjJAP6t9xNUISUTHuRrN1qTALNfS5pJGs7WKBKmyKKNYbyJZxbgmqHKxIqTc/zrbp/jJq93IgoyxR2+DdSrJnBQpJmXGt464DeVNMnUVYoPwI0HxErZPscBzORKygtLPgs+F3IYi41z03ggilxgXXHQrWNmXvWnVuMR2EP+qXfkoWJ1HJVYbiNKDK5eVUMhtKEpMSo1vkTi5psM/23x6DPfhcezN4jHlo7QLUZzPNg+wH8ukt0sQLe0K1C5Blu8itwb7uYoYR7S2hJH7Pi7tBnq2+XQfAiZhANSifQrajVxJ6RiLONYaE2ZIxhQxnl7EXiGlUtgGZL3C1gF4HQMraJU0i12Uj6pU4VIdx0KZJil7svT+uhVuUSA5UUTSBBdbwih8HxdiTH0IRtmVxu32Ke2QrQGB7UZY0Z8UQd6/2eBbwVSR0ko+WenzElbiy0ifvwgxfR6LgCshojVGHGuDokXyBkkTeY4zWlsCKbVyBtKg251B97mQbrqmfcoxst5Er7TQbuRIiEtwgnsmIRGH1Ithjos2Uf23yGtEFNnVLjrEv9pC4l+mfYrIQrMC240cI45F0SJlkKe40OISiKhahTqA3xl0+0I67ZryUfo89guKfyVeL7Igj4TFsfZZ8YKUTF6/Tca3hCKurQnS53XMZk1I+agi26d495dZZZqkxLEesUwTkUCOcS5aW0IRWx0+Uj5KQpmiUtqnCGs3Mi3ThIUFIZLII87F+JZQxDeSRPxrDfEvCWb7ATYw52r5aOsOcawLIaLVQxyLokUkkvkm4evL89qVhwuFYDogYwPrCja0ls0y4l8XsIgyA2WajuAWlNAja2iVaaK/n0gla7ce3YSCCap1vxX/klQ+ato+5YtfeedrsXcXQ2K7Ef6IiWiQRJFlvJVuQsEE2QEZ8a8NSe1Tlv/8rvrlf/029sYCJGYWFgDbjZBQGWYYC5e0WGMCVISgW/cLa59SBfpIb2fFizm4vjzX4/BOMCecI9eX59ojUkoc9PryfB9dtIs8Zu7PHddFLIJyFfoQ1j4lREy7kUcULUKIdIK2uGzg1tpH+agjIYkN0pnAwmLldkJIMFRGuAzYELshrI6fRIKoxxgCjWZrnkUSu+lWkEaztTznXMOqHLegcsJlENY+RRJsN5I9F/N8Y6PZUngOz68vz2ntVoPdeZu2NpqtCeLKh1zMzEclYlxJWOWj6j5BsN2ILKYZsY1m67TuN6LGLEHwrhrNVtmVgYKi8sKlPu2+rCtvbNRwY6GJY61wP5ZIdhvNloR9e6Q8tIBdNJoteoVSUgvhMghsn5I3PbYbCYK9ut8AcmN9kRTUSrgMyKJbE1I+Kg+0ZbXGMk2l04OVr/88SthIukxXUaXZsP4kzTkPY68QJ5VNzpgFJvQnnUG3h+zD7Rn/JATGcAuyOKgMPsLm5CmNZmuEkl4uYm4iZKrtoRqEnbloyhuNkODhE0T7u/RqfgvfZWe/me/SJY56SUkCcGWZ73Fl0dnndTLju3znoyLXdmv3Nu7jtnU8+14P8bvJ5FguIt87bDRbX/NYVzfnhfuzE3lfZyLu43pMx3hz7/T9eoEN4F6QAbuD+2AvlmaOA885qWiSUaPZ8nXz2I+O1YTzUXguY1cSU22FyyCwfcoisN1IAOjJABmFM8GP3xf7WsKkpf88bjRbx8hMi1nXsOROE8a1/V0HjWbr0DX5NZqtbXxPTGA936XPqx2dcFKcj7ImMR3/05NoO/aJlCB+mFRVxywI9LG0wDxy3ceM+SjF1y279qJCPI4c1zO9Z41ma+v68nzN8e+WcN99C/Q048B5To66jtGFln0M+5xOPQJuH296zEazpRdwG+bZ1NJV6EJg+5S09OAWjE02RBYQIx83Y67RbF0kiJYL/dmz6OsQiYsZIhFFT1pvjCWs8M8ck+UsTh173GaJVpTd6PmkBffbNcn7WM87SQLf7bJa0rCaYvGwCnGLHvMiQbRcHOSZ8YpnkyRaUVbtMU7himC1T5Ge0GC3G4mZ9UQEO1qE8Cep6v/EuFAwSbtWqxMsUnqehdV6dMJaUGwUJi3bfefbn3SzDykhfnczSUPEXKK1jxiQb9G4N6+Y4Fi++93H79v1u1mF2GWGNQa0eHzicI0aZvUUS3sPosJ44LnvE9wH31ahXVjaeeASrd6MePC6WQjV3lXowiofdYIVjmsiKYsxKl74BhuRgysO5EKPM7MydmUYTuAmMeJ2ghV0dCI7MJMQRMx37H18bgn/xjWJHEBIzPHHjtjYmhULeQJxjh7TNWFGr61nXEDYlKuTFH5txV0WwSc+N+5L7Q7Te6gc57wLV5lL2BYhzfxhFgFpGOO+rDvGgLLvORYgLgEf4/mZ+36CexFlb47zmgfXeb808UDEgw8st6qJE06fCYUrAYHtUw7ZbqRyjCzr3jcR9eygtv57o9nqOwRnmp2Iz27FvuU1OkBujqfHURur2DH+/0P89yahIFp1HZ+fmIkd/7/lOfdZwqX/zSeYqMY4/odIRFhItDBZu447smNuetLGhO0SufUESyQP9lMK5fD68nxDfeoKdomN/Rx8FtOJHcvDmBo6RFZbOUsFlafSruUDjIOX1jiIJc1QuFIgoH0K241Ukx4mLDMpuCZbzbYjXd63iFqGGPrej03G15fnK7FPebBq8t1HnGIeb8QIouj6/ZiEjJuJttFsjTHBzuu29137Etx1b7wW+1Tyd2TNGGMgrVWji4hPgdhELeEovga32o0dXdz4vmc1h8INfY+oLkeTQKzSWDe/FQrXHOiNvFb6vMu9kjUjCBYrXoTJOBJHMRbNGCvntAuReQq4ruJH7hLByaIrZ7geD24zocPCabsSSTzoYx01mq37t8kstJjnPt6PvbI40d/vCK7QocuamEF0zMwSLtc4SHq9KNqerRAuzDYMnXgyzSykcM0J3HRtxL/yap8yQRyLFS/C5rkjpbgofJbN3CBhxJegoTARGzdT4oSoLYtGs7WC79tOeY465pTbPisPmXlVjGuvJESGFbCIWUP8bSelgJnEmTaFa0FybJ/CdiP1xffMe7aLaAZmRT5yLKq0q2w5aulhr9OWZREqYw0gYcQnWof2ZlWHG84JPt9GfG3ZchM+dGwQNmw5LJd5Gc6oXGHjexah8aHHJXc4x/2cFWu8a/6C8ZK4eDHA+n+CxJ4la//X/QRrjFmFWaCrVHQG3eF/j/8vaXNfap5tPq11m+7f/fYP6nPvfCb2ek3oexIFlqPWBtKUl4xQOawRl3ApuN7aVjZZNP3bjGGdTfZuwiR0bFuTECDX8exzNskn5jt1/EUH/h+ZzDVMYK5MP9ck5gSC67I4V6N9sKL3sYJ9snyicz/qDcACxiTpuMaU775oi9i4wGfmAGDMLVnj5S6eTTsyps4cc+p0HFC4MkBbR3hwVSgbVQpmAv3Zj/9XPfjgSzW8AzeVNXyZXWcmbR7WxxspzqjIoSeWFUy8J5406G3ECvqYBHxj9iT2SvycluDyWfcIbhRnZq7e6GrFsJY9E1+0OsMsThyWoqnCfoh7te74jLmXa4tmNUoCrllXHGwbG4yNJb8XHQu4D2Mrecd3P0xVjrTseXIEzkwMCwuY2FgxViKFi5QKBmhRyS4hsO/Zo7WdIDKGm6wriOCxR7x8e3sMYytF35dAsoo09tgbCfhSz3cdm6dt5tnjZDj2xE5WUySHHFdBtCzanmanuyl+d3ZSTFJW6Dwceo6bZkxNF1SsnEFKA66JV55BXEswYe4nuGV8xOoCYv9VLP19BmO7Xh/iUWmThJwiZ6pwIK19kb1Rafc43YDzf7TAfezhvlUGuPwWycps2+5Cy5KfReJ4sWKc89Iz2wYoXKRwtGsJVRbmqSNXGyBAaymtjD6qajgFAS64RykC8ROshGMuMkzkSUkNYxzDlz13YynifA59Ihehj/NxXtsscB0rCWWybEYQ7CzS7sVhjak0CRne+44YlE+YxjjGrNJV5nw2EtyPNrFnc6cz6P4x9rH5MQ0aa0uKlOFUXF+e36nqPcTKO7GE1oMPvpxFjKtS49EqVLtul0FyBM8TwfdEXUapN8BamV8mDjVCDGShjfHWZuZbX1vK45n7aJIDzDGqlpCRSCTzb6H7HskCNONg0Uon9vmsWmNr4ns2jHGR3MHAfJyFsNcRazK57WTuKgO1jFI7o1kChAkkM0HB8cwxc9+jleF9DJrIc1zoXljfcet7ucj50FVIcgVB91cULRE8h1vxTiTGsMSMWBIStLhILlgp0r59QKRArMK4ZkXL2CIJFgoXyRTELY64ghfHNLblSTWeFFwJnZBbQeEimWDFsfa4mhdJP1KtQFk1Bk9cAXBCpELhIrcmi8rhGTKZo65fbUBZJUIqAYWLLAziJgdJ6e0FwwLFhNQACheZG4FlmqaVAdhok5B6QOEic4GN1lLiWGM02py3jh0hJGAoXCQVaP+QZd+x2zCtmfZs82lZTRqddAbdtOn/WmxHkc9Pnm0+TYxDdQbdM2vBMDItcDqD7i4KyvrQldV7UYu0M+i6Cq8adOLGi2j37XmvEf/GJO48tNzKY1jKz2d1+LbOc/xs82liSabOoLtsua/NWDVJKHQjVwQKF0nE6tckJY7Vw6QocQJaTXmfjPi88XndlNRnPaJhqW+LwaxeWNNYZGfQPYyI/ax/87gz6PYiYjHXNXYGXVON3dVfa1qdvDPoajevMx0fomzfoxMjiJ7PutprmEaV+lgbvn9PwoHCRZxYnW+T2l8UiVkxJ67OBaEn4o88p+OLxW0lFNZ1lWtyMYz0rtqyLCQtXiOPONpFdG3LSE/2H3ms21mFd1XESh+hAOsYxzAx0tPOoDv2PNvode+4CrPC0rJbpvSt+7CF69Fj+qwz6K7R8gobCheJgXYjMzuZFsQYguVckQtmpgvMgRaJmDUJV1vaRJiXEZF50hl0H1uT+pFLHKPCFLFedtBiPfHfRIGY2K7BDevaep1B90PrvHaiderw76NW5i7avkTZtsZr1Eo8hpt122qeyQ3XAcNaheQGYe1GbtpsBCha82ILlcsdaL82t6XwbPPpsWUBpYpR4p6bYy0a17T/3dhh5fSsQq2u67Kv24jtEkQ1ij1eXZbu86yKwpLyeRuDxzUQSE0QWKapjziWz6VWNUaY5JeRsRkV6j3811RTXyTe6BKGXNEWZ2fQNYdY15YfRHQKhCyp/Yx93W1rfG457pHtPtzrDLpD2+KFezRmaZIweVub1DrgKSwATwpAYLuR4ce/+M3hs81/rsKqeKcz6Lp+T7HsPsSgTvAcVrWLzHwG7jITo/K1vk8ECRI32YtJnzXAvXiTwRj7wOvP+FyF9jUeW3HSo86guwcBeZ6UJIFzNhZbX4tcZ9DtQ7y27XukIEw6fmf1c7rA/z/Hv+cevwoxjXFhAG0gc0lKyjPJEZRpktKBeIJmhr2fX8beCxWfF2PoSM5YggVhFhB7Vhxnz/pcP4VwPYwIyt3IuThbr0dS45ciKe++JAzfgufmGnXKPqwuI17L+LvOWEzah2dftynh9cKyurYdnXg3kMFoN4xchWD2ESv1iiUJhzdiXBhAaxiozLqpIIhjXSHwLkG09FhbcbUJD5yRFVMZzojlKFgEZgK3Xbbm72mtBlOG68DKCjXPeeiY7O1/Z/7Y1tkjj7Aox7U5rxH7zVwt9JeR5fdGCjuSUcx1jy2xsc/DFjZznAk6X2843IL6+6488TESGLGsQviddSaSWQHyQVcAxLEkPc8+rKyqunD2F8gqNBbFMrwfyvJ+LFo4eATr58WMJBe7T5cRrn6CaCmIRCogujpO1YYLdccaizqb8qV1fnaG4Cjich2azcXaneiyoHDfh5YA7lhW2CniX3QdBkxMuAxmoHUG3efCCqmSORDYbmQEwWJ2VwQ9caMyxVJk/9IkSUAiRDcZpz32VIQw2b/COexi0/JCkzziVHalj4l6U1ii6fA96++GpI3Xe6aTsy1uZsGA4/WQen82w81IAmJmOrweBBjUbZ+bg8gEcawrIXuyTBxrjaKViBGoXcsiSbKUMgWTvR0HmzsZxGIPDSwvPAvf2HVF9n7Nwha0M3MsiG+UF9b/u94nAZF6HxfM+JWEQC0Rgi7T1Gi2LhDHkpBoc4w4Fle5s3ElTxTdX+zYWqRue7Ij02BX8DhwCIrttp44XtPu1jvRP5bg2Xu6bIv0DbHFcW0rjm7CwPG6Cl1E4l9szy4Mqe1GKhzHSkJnsvk8FPuu2IxChq+V1q3gYnN+Ni+Qen5iZQ0euDbuzijSuw/X556V3feJji/h/WjmohFsW2B87tEX1hg3LsZDKza2CzT0g0AAAAKfSURBVLG1N12bBdwk4XtJICxUOUP7vFHJesO3x4MUC9qNvBIiWtPyPteX5xs1FS1lFaN1/ZnlqrItLJcFljuIk5lnt+6xulzXtq7evMZohl80c1Ghl9oQx7ipa+iLrSHeZ5+b2dNlz0fL1rHMd0bLTpFAuVWtQgRB1zyDmhSAxHYj15fnotqNFMjziHvMh5l0fZ/vWRN/1Dowrnp7Uh96/j6LWW7/tiPe5DvnKGYf1zSlHrErvaj6GsbqCKWZomn+5pxmXce+JX5L6tP9qGvIyNTv3cd7L5FWH4upkTC5w+eWDbB4fBsyU3N9eZ7qmSC9/dQxsZRFD8kXXM0SQnKF1eEDQ2i7ES1YdBkTQgqBwhUQEtuNVLDiBSFEOBSuANBlmhDHStMyPW/MPp9jugUJIWVA4RKMwHYjPVhZzmwvQggpAgqXQAS2G2GZJkKIGChcwpDabiT2DiGElASFSx6nQs7okHEsQohEKFwkStXbjRBCAofCRQxj1BVkHIsQIhoKF5kgU5CV2wkhQUDhqjfHEC3GsQghwUDhqid1bjdCCAkcCle9GCPxgv2ICCHBQuGqB3VvN0IIqRAUrurDdiOEkEpB4aouQyReML2dEFIpKFzVg+1GCCGVhsJVHdhuhBBSCyhc1YBlmgghtYHCFTZsN0IIqR0UrjBhuxFCSG2hcIUH240QQmoNhSscWKaJEFJ7FIUrCNhuhBBCLChccmG7EUIIcUDhkgnbjRBCiAcKV3ZkEXsaIltwFHuHEELIlDu8DdnRaLZWlVJHSqn1Ob+UcSxCCEkJhSsHGs3WNgRseca3M45FCCFzQuHKkUazpftf7SmllhxHYRyLEEIWgMKVM41mawnW1y6OxDgWIYQQ+ej4V6PZmjf2RQghxEYp9f9V3Rg0ahPslgAAAABJRU5ErkJggg==',
              width: 100,
            },
            {
              text: 'PMZ - Pedidos: ' + req.query.codPedido,
              style: 'header',
              alignment: 'center',
            },
            {
              text: 'Nome do cliente: ' + pessoa.nomeCompleto,
              style: 'name',
              alignment: 'center',
            },
            { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] },
            {
              style: 'info',
              text: 'PMZ DISTRIBUIDORA S.A - 22.763.502/0002-98',
            },
            {
              fontSize: 10,
              text: 'AV.SILVES, CRESPO, 2035',
            },
            {
              fontSize: 10,
              text: 'Fone: 092-36140800',
            },
            {
              fontSize: 10,
              text: 'OBS: ' + resp[0].observacao,
            },

            {
              style: 'tableExample',
              table: {
                body: test,
              },
              fontSize: 9,
              layout: 'lightHorizontalLines',
            },
            {
              fontSize: 20,
              text: 'TOTAL: ' + resp[0].total,
              alignment: 'center',
              bold: true,
            },
            {
              fontSize: 7,
              alignment: 'center',
              margin: [0, 10, 0, 10],
              text:
                'ESTE ORÇAMENTO TEM VALIDADE POR UM DIA. NÃO E DOCUMENTO FISCAL, EXIJA O CUPOM OU NOTA FISCAL',
            },
          ],
          styles: {
            header: {
              fontSize: 20,
              bold: true,
            },
            tableExample: {
              margin: [0, 10, 0, 10],
            },
            tableHeader: {
              bold: true,
              alignment: 'center',
            },
            data: {
              fontSize: 10,
            },
            info: {
              margin: [0, 5, 0, 0],
              fontSize: 10,
            },
            name: {
              margin: [0, 0, 0, 5],
            },
          },
        };

        const pdfDoc = pdfMake.createPdf(docDefinition);
        pdfDoc.getBase64(data => {
          res.writeHead(200, {
            'Content-Type': 'application/',
            'Content-Disposition': 'attachment;filename="pmz-pedido.pdf"',
          });

          const download = Buffer.from(data.toString('utf-8'), 'base64');
          res.end(download);
        });
      } catch (handleError) {
        res.end('Sem Pedido');
      }
    });

    apolloServer.applyMiddleware({ app });
    app.listen({ port, host }, () => {
      console.log(`🚀Server ready`);
    });
  });

// const onError = (server: Server) => {
//   return (error: NodeJS.ErrnoException): void => {
//     // @ts-ignore
//     const runningPort: number | string = server.address().port;
//     if (error.syscall !== 'listen') {
//       throw error;
//     }
//     const bind = typeof port === 'string' ? `pipe ${runningPort}` : `port ${runningPort}`;
//     switch (error.code) {
//       case 'EACCES':
//         console.error(`${bind} requires elevated privileges`);
//         process.exit(1);
//         break;
//       case 'EADDRINUSE':
//         console.error(`${bind} is already in use`);
//         process.exit(1);
//         break;
//       default:
//         throw error;
//     }
//   };
// };

// app.listen();

// pedido.get((req, res) => {
//   console.log(req.param);
//   res.setHeader('Content-Type', 'text/plain; charset=utf-8');
//   res.end('Hello World!');
// });
