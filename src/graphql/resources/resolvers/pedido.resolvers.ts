import { ResolverContext } from '../../../interfaces/ResolverContextInterface';
import { gqlCompose } from '../../../utils/utils';
import { authResolvers } from '../../composable/auth.resolver';

export const pedidoResolvers = {
  Mutation: {
    createOrder: gqlCompose(...authResolvers)(
      async (parent, { setPedido }, { dataSources }: ResolverContext, info) => {
        const pessoa = await dataSources.pessoaApi.searchPessoa(setPedido.codcliente);

        const buscaCondicao = {
          operacao: 2,
          tipoPreco: pessoa.clientes.tipoPreco,
          formaPagamento: 'F',
          prazoMedio: pessoa.clientes.prazoMedio,
        };

        const condicao = await dataSources.geralApi.searchCondicao(buscaCondicao);

        // TODO Tirar dados Mockados
        const buscaProduto = setPedido.itens.map(produto => ({
          condicao: condicao[0].codigo,
          descontoItem: 0,
          fatorAumento: pessoa.clientes.percentualAumento,
          filial: 34,
          fornecedorCodigo: produto.fornecedor_cod,
          fornecedorEmpresa: produto.fornecedor_emp,
          produto: produto.produto,
          tipoPreco: pessoa.clientes.tipoPreco,
          unidadeVenda: 'UN',
        }));

        // console.log(buscaProduto);

        const produtosPreco = await dataSources.precoApi.buscaListaProdutosEstoquePreco(
          buscaProduto,
        );

        const item = [];
        let total = 0;

        setPedido.itens.map(pedido => {
          const resp: [] = produtosPreco
            .map(itens => {
              /* istanbul ignore next */
              if (pedido.produto === itens.produto) {
                return itens.unidade
                  .map(tes => {
                    /* istanbul ignore if */
                    if (pedido.unidade === tes.tipo) {
                      total += pedido.quantidade * tes.preco;
                      return {
                        fornecedor_emp: itens.empresa,
                        fornecedor_cod: itens.fornecedorCodigo,
                        produto: itens.produto,
                        quantidade: pedido.quantidade,
                        vl_item: Number(tes.preco).toFixed(2),
                        vl_total: Number(pedido.quantidade * tes.preco).toFixed(2),
                        unidade: tes.tipo,
                        embalagem: tes.qtd,
                        qtd_estoque: itens.qtdEstoque,
                      };
                    } else {
                      return false;
                    }
                  })
                  .filter(v => v !== false)[0];
              } else {
                return false;
              }
            })
            .filter(v => v !== false);
          item.push(...resp);
        });

        const pagamento = await dataSources.geralApi.searchPagamento({
          codigo: setPedido.condicao,
        });

        const tipoPagamento = await dataSources.geralApi.searchTipoPagamento({
          codigo: pagamento.documento,
        });

        // TODO Tirar dados Mockados
        const order = await dataSources.pedidoService.createOrder({
          ...setPedido,
          codfuncionario: 1,
          endereco: { codendereco: pessoa.enderecos[0].id },
          codcliente: pessoa.clientes.id,
          condicao: pagamento.codigo,
          situacao: 'S',
          codfilial: 34,
          itens: item,
          total: Number(total).toFixed(2),
          pagamento: {
            codtipopagto: tipoPagamento.codigo1,
            situacao: 'S',
            valor_pago: Number(total).toFixed(2),
            cod_adm: '1',
            parcela: setPedido.pagamento.parcela,
          },
        });

        const end = pessoa.enderecos.find(value => {
          return value.validTipoFiscal === true;
        });

        return {
          ...order.get({ plain: true }),
          endereco: end,
          itens: item,
          descricaoPagamento: pagamento.descricao,
          qtdItens: item.length,
        };
      },
    ),
  },
  Query: {
    findOrdersByCliente: gqlCompose(...authResolvers)(
      async (parent, { codCliente }, { dataSources }: ResolverContext, info) => {
        const pessoa = await dataSources.pessoaApi.searchPessoa(codCliente);

        const resp = await dataSources.pedidoService.findPedidoByCliente(pessoa.clientes.id);

        const param: any = [];

        resp.forEach(value => {
          value.itens.forEach(res => {
            param.push(res.fornecedor_emp + '___' + res.fornecedor_cod + '___' + res.produto);
          });
        });

        const produto = await dataSources.catalogoApi.searchProductName(param);

        produto.forEach(value => {
          resp.forEach(res => {
            res.itens.forEach(vai => {
              const condicao =
                vai.fornecedor_emp + '___' + vai.fornecedor_cod + '___' + vai.produto;
              if (condicao === value.codigo) {
                vai.produto = value.nome;
              }
            });
          });
        });

        let pagamento: any = [];

        const retorno = await resp.map(async res => {
          pagamento = await dataSources.geralApi.searchPagamento({
            codigo: res.condicao,
          });
          return {
            ...res,
            descricaoPagamento: pagamento.descricao,
          };
        });

        return retorno;
      },
    ),
  },
};
