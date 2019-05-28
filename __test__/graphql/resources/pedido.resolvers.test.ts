import { gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import { constructTestServer } from '../../__utils';

describe('Pedido Test', () => {
  it('Should return pedido', async () => {
    const dbMocks = {
      Pedido: {
        model: {
          codpedido: 210,
          codfilial: 34,
          codcliente: 145995,
          codfuncionario: 123,
          condicao: 'A',
          emissao: Date.now(),
          situacao: 'A',
          total: 54.35,
          observacao: ' ',
          ordemcompra: '1234984',
          pedidos_itens: [
            {
              codpedido: '210',
              codpedidoitem: 308,
              fornecedor_emp: 1,
              fornecedor_cod: 1416,
              vl_item: 697.6,
              produto: '15W40 SELENIA K',
              quantidade: 4,
              vl_total: 2790.4,
              unidade: 'CX',
              embalagem: 24,
              qtd_estoque: 3310,
            },
          ],
        },
      },
    };

    const { server, pedidoService, pessoaApi } = constructTestServer({
      authorization: true,
      dbMocks,
    });

    // @ts-ignore
    pedidoService.getCached = jest.fn(() => []);

    // @ts-ignore
    pessoaApi.get = jest.fn(() => ({
      nomeCompleto: 'KATIA',
      nomeFantasia: 'KATIA',
      tipoPessoa: 'PF',
      dataCadastro: '1542772800000',
      tipoCadastro: 1,
      emails: [],
      enderecos: [],
      telefones: [],
      pessoaFisica: {
        id: 10905700,
        cpf: '02570039241',
        numeroRg: '21112545',
        emissaoRg: '819864000000',
        emissorRg: 'SSP',
        cgf: null,
        inscricaoMunicipal: ' ',
        operIsenta: 'N',
        calcIpi: 'N',
      },
      clientes: {
        id: 145995,
      },
    }));

    const client = createTestClient(server);

    const res = await client.query({
      query: gql`
        {
          findOrdersByCliente(codCliente: "02570039241") {
            codpedido
            itens {
              codpedido
              codpedidoitem
              fornecedor_emp
              fornecedor_cod
              vl_item
              produto
              quantidade
              vl_item
              vl_total
              unidade
              embalagem
              qtd_estoque
            }
          }
        }
      `,
    });

    // @ts-ignore
    expect(res.data.findOrdersByCliente).toEqual([]);
  });

  it('test mutation createOrder ', async () => {
    const dbMocks = {
      Pedido: {
        model: {
          emissao: null,
          codpedido: '169',
          codcliente: '34223',
          observacao: 'test',
          ordem_compra: 'COMPRA B2B',
          codfuncionario: '1',
          condicao: 'XXXXXXX',
          situacao: 'S',
          codfilial: 34,
          total: 273,
          endereco: {
            id: 274150,
            inscricaoEstadual: null,
            codPais: 1058,
            infobusca: 0,
            logradouro: 'AV. CAMAPUA SALA 01.  NR.921',
            codUf: 13,
            codMunicipio: 1302603,
            cep: '69097720',
            bairro: 'CIDADE NOVA',
            numero: '921',
            contato: 'COMPRAS',
            complemento: ' ',
            tipo: 3,
            validInfoBusca: true,
            validTipoEndereco: true,
            numeroNulo: false,
            validTipoFiscal: true,
          },
        },
      },
      ItensPedido: {
        model: {
          fornecedor_emp: 1,
          fornecedor_cod: 144,
          produto: 'B47097',
          quantidade: 1,
          vl_item: 15.2,
          vl_total: 1 * 15.2,
          unidade: 'UN',
          embalagem: 1,
          qtd_estoque: 50,
        },
      },
      Pagamento: {
        model: {
          codtipopagto: 4,
          situacao: 'S',
          valor_pago: 15.2,
          cod_adm: '1',
          parcela: 1,
        },
      },
      Endereco: {
        model: { codendereco: 96810 },
      },
    };

    const { server, pedidoService, pessoaApi, precoApi } = constructTestServer({
      authorization: true,
      dbMocks,
    });

    // @ts-ignore
    pedidoService.getCached = jest.fn(() => []);
    // @ts-ignore
    pessoaApi.get = jest.fn(() => ({
      clientes: {
        id: 123123,
        tipoPreco: 'N',
      },
      enderecos: [{ id: 123123, validTipoFiscal: true }],
    }));

    // @ts-ignore
    precoApi.post = jest.fn(() => [
      {
        empresa: 1,
        fornecedorCodigo: 144,
        produto: '16001',
        quantidade: 1,
        qtdEstoque: 50,
        unidade: [
          {
            tipo: 'UN',
            preco: 15.5,
            qtd: 1,
          },
        ],
      },
    ]);

    const client = createTestClient(server);

    const res = await client.mutate({
      mutation: gql`
        mutation {
          createOrder(
            setPedido: {
              observacao: "test"
              ordem_compra: "COMPRA B2B"
              codcliente: "13484296000105"
              itens: [
                {
                  fornecedor_emp: 1
                  fornecedor_cod: 144
                  produto: "16001"
                  quantidade: 1
                  unidade: "UN"
                }
              ]
              pagamento: { parcela: 1 }
            }
          ) {
            codpedido
            codfilial
            codfuncionario
            codcliente
            condicao
            emissao
            situacao
            total
            observacao
            ordem_compra
          }
        }
      `,
    });

    // @ts-ignore
    expect(res.data.createOrder).toHaveProperty('codpedido');
  });
});
