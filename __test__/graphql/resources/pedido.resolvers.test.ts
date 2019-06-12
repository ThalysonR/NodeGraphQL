import { gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import { constructTestServer } from '../../__utils';

describe('Pedido Test', () => {
  it('Should return pedido', async () => {
    const dbMocks = await {
      Pedido: {
        model: {
          codpedido: 287,
          codfilial: 34,
          codcliente: 145995,
          codfuncionario: 123,
          condicao: 'XXXXXXX',
          emissao: Date.now(),
          situacao: 'S',
          total: 200,
          observacao: ' ',
          ordemcompra: '1234984',
          pedidos_itens: [
            {
              codpedido: 287,
              codpedidoitem: 308,
              fornecedor_emp: 1,
              fornecedor_cod: 1416,
              vl_item: 50,
              produto: '15W40 SELENIA K',
              quantidade: 4,
              vl_total: 50 * 4,
              unidade: 'CX',
              embalagem: 24,
              qtd_estoque: 3310,
            },
          ],
        },
      },
    };

    const { server, pedidoService, pessoaApi, catalogoApi, geralApi } = constructTestServer({
      authorization: true,
      dbMocks,
    });

    // @ts-ignore
    catalogoApi.post = jest.fn(() => [
      {
        codigo: '1___1416___15W40 SELENIA K',
        nome: 'LITRO OLEO SELENIA K 15W40 SN PETRONAS',
      },
    ]);

    // @ts-ignore
    pedidoService.getCached = jest.fn(() => []);

    // @ts-ignore
    pessoaApi.get = jest.fn(() => ({
      nomeCompleto: 'KATIA',
      nomeFantasia: 'KATIA',
      tipoPessoa: 'PJ',
      dataCadastro: '1542772800000',
      tipoCadastro: 1,
      emails: [],
      enderecos: [],
      telefones: [],
      pessoaJuridica: {
        id: 10905700,
        cnpj: '13484296000105',
      },
      clientes: {
        id: 145995,
      },
    }));

    // @ts-ignore
    geralApi.get = jest.fn(() => [
      {
        recnum: 633,
        codigo: 'A8',
        nomeCondicaoPagamento: 'ATAC P/ 1 DIA',
        descricao: 'ATAC P/ 1 DIA',
        parcelas: 1,
        periodo: 0,
        periodoEntrada: 1,
        valor: 9999999.99,
        documento: 'F',
        descontoMedio: 29.4,
        tipoPreco: 'A',
        parcelaCartao: 0,
        ativo: 'S',
        caf: ' ',
      },
      {
        recnum: 4,
        codigo: 'F',
        codigo1: 4,
        descricao: 'Faturamento',
        descricao1: 'FATURAMENTO',
        obs: ' ',
        de_est_contrib: 'C',
        de_est_ncontrib: 'C',
        fo_est_contrib: 'C',
        caf: ' ',
      },
      {
        recnum: 1541,
        codigo: 'D54',
        nomeCondicaoPagamento: '07/14/21/28/35',
        descricao: 'PARA 07/14/21/28/35 DIAS',
        parcelas: 5,
        periodo: 7,
        periodoEntrada: 7,
        valor: 9999999.99,
        documento: 'F',
        descontoMedio: 24.5,
        tipoPreco: 'N',
        parcelaCartao: 0,
        ativo: 'S',
        caf: ' ',
      },
    ]);

    const cliente = createTestClient(server);

    const res = await cliente.query({
      query: gql`
        query {
          findOrdersByCliente(codCliente: "13484296000105") {
            codpedido
            situacao
            total
            qtdItens
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
    expect(res.data.findOrdersByCliente[0]).toHaveProperty('codpedido');
  });

  it('Should return pedido in progress', async () => {
    const dbMocks = await {
      Pedido: {
        model: {
          codpedido: 287,
          codfilial: 34,
          codcliente: 145995,
          codfuncionario: 123,
          condicao: 'XXXXXXX',
          emissao: Date.now(),
          situacao: 'A',
          total: 400,
          observacao: ' ',
          ordemcompra: '1234984',
          pedidos_itens: [
            {
              codpedido: 287,
              codpedidoitem: 308,
              fornecedor_emp: 1,
              fornecedor_cod: 1416,
              vl_item: 0,
              produto: '15W40 SELENIA K',
              quantidade: 0,
              vl_total: 100 * 4,
              unidade: 'CX',
              embalagem: 24,
              qtd_estoque: 3310,
            },
          ],
        },
      },
    };

    const { server, pedidoService, pessoaApi, catalogoApi, geralApi } = constructTestServer({
      authorization: true,
      dbMocks,
    });

    // @ts-ignore
    catalogoApi.post = jest.fn(() => [
      {
        codigo: '1___1416___15W40 SELENIA K',
        nome: 'LITRO OLEO SELENIA K 15W40 SN PETRONAS',
      },
    ]);

    // @ts-ignore
    pedidoService.getCached = jest.fn(() => []);

    // @ts-ignore
    pessoaApi.get = jest.fn(() => ({
      nomeCompleto: 'KATIA',
      nomeFantasia: 'KATIA',
      tipoPessoa: 'PJ',
      dataCadastro: '1542772800000',
      tipoCadastro: 1,
      emails: [],
      enderecos: [],
      telefones: [],
      pessoaJuridica: {
        id: 10905700,
        cnpj: '13484296000105',
      },
      clientes: {
        id: 145995,
      },
    }));

    // @ts-ignore
    geralApi.get = jest.fn(() => [
      {
        recnum: 633,
        codigo: 'A8',
        nomeCondicaoPagamento: 'ATAC P/ 1 DIA',
        descricao: 'ATAC P/ 1 DIA',
        parcelas: 1,
        periodo: 0,
        periodoEntrada: 1,
        valor: 9999999.99,
        documento: 'F',
        descontoMedio: 29.4,
        tipoPreco: 'A',
        parcelaCartao: 0,
        ativo: 'S',
        caf: ' ',
      },
      {
        recnum: 4,
        codigo: 'F',
        codigo1: 4,
        descricao: 'Faturamento',
        descricao1: 'FATURAMENTO',
        obs: ' ',
        de_est_contrib: 'C',
        de_est_ncontrib: 'C',
        fo_est_contrib: 'C',
        caf: ' ',
      },
      {
        recnum: 1541,
        codigo: 'D54',
        nomeCondicaoPagamento: '07/14/21/28/35',
        descricao: 'PARA 07/14/21/28/35 DIAS',
        parcelas: 5,
        periodo: 7,
        periodoEntrada: 7,
        valor: 9999999.99,
        documento: 'F',
        descontoMedio: 24.5,
        tipoPreco: 'N',
        parcelaCartao: 0,
        ativo: 'S',
        caf: ' ',
      },
    ]);

    const cliente = createTestClient(server);

    const res = await cliente.query({
      query: gql`
        query {
          findOrdersByCliente(codCliente: "13484296000105") {
            codpedido
            situacao
            total
            qtdItens
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
    expect(res.data.findOrdersByCliente[0]).toHaveProperty('codpedido');
  });

  it('Should return pedido delivered', async () => {
    const dbMocks = await {
      Pedido: {
        model: {
          codpedido: 287,
          codfilial: 34,
          codcliente: 145995,
          codfuncionario: 123,
          condicao: 'XXXXXXX',
          emissao: Date.now(),
          situacao: 'E',
          total: 300,
          observacao: ' ',
          ordemcompra: '1234984',
          pedidos_itens: [
            {
              codpedido: 287,
              codpedidoitem: 308,
              fornecedor_emp: 1,
              fornecedor_cod: 1416,
              vl_item: 150,
              produto: '15W40 SELENIA K',
              quantidade: 4,
              vl_total: 150 * 1,
              unidade: 'CX',
              embalagem: 24,
              qtd_estoque: 3310,
            },
          ],
        },
      },
    };

    const { server, pedidoService, pessoaApi, catalogoApi, geralApi } = constructTestServer({
      authorization: true,
      dbMocks,
    });

    // @ts-ignore
    catalogoApi.post = jest.fn(() => [
      {
        codigo: '1___1416___15W40 SELENIA K',
        nome: 'LITRO OLEO SELENIA K 15W40 SN PETRONAS',
      },
    ]);

    // @ts-ignore
    pedidoService.getCached = jest.fn(() => []);

    // @ts-ignore
    pessoaApi.get = jest.fn(() => ({
      nomeCompleto: 'KATIA',
      nomeFantasia: 'KATIA',
      tipoPessoa: 'PJ',
      dataCadastro: '1542772800000',
      tipoCadastro: 1,
      emails: [],
      enderecos: [],
      telefones: [],
      pessoaJuridica: {
        id: 10905700,
        cnpj: '13484296000105',
      },
      clientes: {
        id: 145995,
      },
    }));

    // @ts-ignore
    geralApi.get = jest.fn(() => [
      {
        recnum: 633,
        codigo: 'A8',
        nomeCondicaoPagamento: 'ATAC P/ 1 DIA',
        descricao: 'ATAC P/ 1 DIA',
        parcelas: 1,
        periodo: 0,
        periodoEntrada: 1,
        valor: 9999999.99,
        documento: 'F',
        descontoMedio: 29.4,
        tipoPreco: 'A',
        parcelaCartao: 0,
        ativo: 'S',
        caf: ' ',
      },
      {
        recnum: 4,
        codigo: 'F',
        codigo1: 4,
        descricao: 'Faturamento',
        descricao1: 'FATURAMENTO',
        obs: ' ',
        de_est_contrib: 'C',
        de_est_ncontrib: 'C',
        fo_est_contrib: 'C',
        caf: ' ',
      },
      {
        recnum: 1541,
        codigo: 'D54',
        nomeCondicaoPagamento: '07/14/21/28/35',
        descricao: 'PARA 07/14/21/28/35 DIAS',
        parcelas: 5,
        periodo: 7,
        periodoEntrada: 7,
        valor: 9999999.99,
        documento: 'F',
        descontoMedio: 24.5,
        tipoPreco: 'N',
        parcelaCartao: 0,
        ativo: 'S',
        caf: ' ',
      },
    ]);

    const cliente = createTestClient(server);

    const res = await cliente.query({
      query: gql`
        query {
          findOrdersByCliente(codCliente: "13484296000105") {
            codpedido
            situacao
            total
            qtdItens
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
    expect(res.data.findOrdersByCliente[0]).toHaveProperty('codpedido');
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

    const { server, pedidoService, pessoaApi, precoApi, geralApi } = constructTestServer({
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

    // @ts-ignore
    geralApi.get = jest.fn(() => [
      {
        recnum: 633,
        codigo: 'A8',
        nomeCondicaoPagamento: 'ATAC P/ 1 DIA',
        descricao: 'ATAC P/ 1 DIA',
        parcelas: 1,
        periodo: 0,
        periodoEntrada: 1,
        valor: 9999999.99,
        documento: 'F',
        descontoMedio: 29.4,
        tipoPreco: 'A',
        parcelaCartao: 0,
        ativo: 'S',
        caf: ' ',
      },
      {
        recnum: 4,
        codigo: 'F',
        codigo1: 4,
        descricao: 'Faturamento',
        descricao1: 'FATURAMENTO',
        obs: ' ',
        de_est_contrib: 'C',
        de_est_ncontrib: 'C',
        fo_est_contrib: 'C',
        caf: ' ',
      },
      {
        recnum: 1541,
        codigo: 'D54',
        nomeCondicaoPagamento: '07/14/21/28/35',
        descricao: 'PARA 07/14/21/28/35 DIAS',
        parcelas: 5,
        periodo: 7,
        periodoEntrada: 7,
        valor: 9999999.99,
        documento: 'F',
        descontoMedio: 24.5,
        tipoPreco: 'N',
        parcelaCartao: 0,
        ativo: 'S',
        caf: ' ',
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
              condicao: "A8"
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
            descricaoPagamento
            itens {
              codpedido
              produto
              fornecedor_emp
              fornecedor_cod
              vl_item
              vl_total
              unidade
            }
            qtdItens
          }
        }
      `,
    });

    // @ts-ignore
    expect(res.data.createOrder).toHaveProperty('codpedido');
  });

  it('Should return request by code and cpfcnpj', async () => {
    const dbMocks = await {
      Pedido: {
        model: {
          codpedido: 287,
          codfilial: 34,
          codcliente: 145995,
          codfuncionario: 123,
          condicao: 'XXXXXXX',
          emissao: Date.now(),
          situacao: 'S',
          total: 200,
          observacao: ' ',
          ordemcompra: '1234984',
          pedidos_itens: [
            {
              codpedido: 287,
              codpedidoitem: 308,
              fornecedor_emp: 1,
              fornecedor_cod: 1416,
              vl_item: 50,
              produto: '15W40 SELENIA K',
              quantidade: 4,
              vl_total: 50 * 4,
              unidade: 'CX',
              embalagem: 24,
              qtd_estoque: 3310,
            },
          ],
        },
      },
    };

    const { server, pedidoService, pessoaApi, catalogoApi, geralApi } = constructTestServer({
      authorization: true,
      dbMocks,
    });

    // @ts-ignore
    catalogoApi.post = jest.fn(() => [
      {
        codigo: '1___1416___15W40 SELENIA K',
        nome: 'LITRO OLEO SELENIA K 15W40 SN PETRONAS',
      },
    ]);

    // @ts-ignore
    pedidoService.getCached = jest.fn(() => []);

    // @ts-ignore
    pessoaApi.get = jest.fn(() => ({
      nomeCompleto: 'KATIA',
      nomeFantasia: 'KATIA',
      tipoPessoa: 'PJ',
      dataCadastro: '1542772800000',
      tipoCadastro: 1,
      emails: [],
      enderecos: [],
      telefones: [],
      pessoaJuridica: {
        id: 10905700,
        cnpj: '13484296000105',
      },
      clientes: {
        id: 145995,
      },
    }));

    // @ts-ignore
    geralApi.get = jest.fn(() => [
      {
        recnum: 633,
        codigo: 'A8',
        nomeCondicaoPagamento: 'ATAC P/ 1 DIA',
        descricao: 'ATAC P/ 1 DIA',
        parcelas: 1,
        periodo: 0,
        periodoEntrada: 1,
        valor: 9999999.99,
        documento: 'F',
        descontoMedio: 29.4,
        tipoPreco: 'A',
        parcelaCartao: 0,
        ativo: 'S',
        caf: ' ',
      },
      {
        recnum: 4,
        codigo: 'F',
        codigo1: 4,
        descricao: 'Faturamento',
        descricao1: 'FATURAMENTO',
        obs: ' ',
        de_est_contrib: 'C',
        de_est_ncontrib: 'C',
        fo_est_contrib: 'C',
        caf: ' ',
      },
      {
        recnum: 1541,
        codigo: 'D54',
        nomeCondicaoPagamento: '07/14/21/28/35',
        descricao: 'PARA 07/14/21/28/35 DIAS',
        parcelas: 5,
        periodo: 7,
        periodoEntrada: 7,
        valor: 9999999.99,
        documento: 'F',
        descontoMedio: 24.5,
        tipoPreco: 'N',
        parcelaCartao: 0,
        ativo: 'S',
        caf: ' ',
      },
    ]);

    const cliente = createTestClient(server);

    const res = await cliente.query({
      query: gql`
        query {
          getPedbyCode(setPedPDF: { codPedido: 492, cpfCnpj: "13484296000105" }) {
            codpedido
            situacao
            total
            qtdItens
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
    expect(res.data.getPedbyCode[0]).toHaveProperty('codpedido');
  });

  it('Should return request by code and cpfcnpj in progress', async () => {
    const dbMocks = await {
      Pedido: {
        model: {
          codpedido: 287,
          codfilial: 34,
          codcliente: 145995,
          codfuncionario: 123,
          condicao: 'XXXXXXX',
          emissao: Date.now(),
          situacao: 'A',
          total: 200,
          observacao: ' ',
          ordemcompra: '1234984',
          pedidos_itens: [
            {
              codpedido: 287,
              codpedidoitem: 308,
              fornecedor_emp: 1,
              fornecedor_cod: 1416,
              vl_item: 50,
              produto: '15W40 SELENIA K',
              quantidade: 4,
              vl_total: 50 * 4,
              unidade: 'CX',
              embalagem: 24,
              qtd_estoque: 3310,
            },
          ],
        },
      },
    };

    const { server, pedidoService, pessoaApi, catalogoApi, geralApi } = constructTestServer({
      authorization: true,
      dbMocks,
    });

    // @ts-ignore
    catalogoApi.post = jest.fn(() => [
      {
        codigo: '1___1416___15W40 SELENIA K',
        nome: 'LITRO OLEO SELENIA K 15W40 SN PETRONAS',
      },
    ]);

    // @ts-ignore
    pedidoService.getCached = jest.fn(() => []);

    // @ts-ignore
    pessoaApi.get = jest.fn(() => ({
      nomeCompleto: 'KATIA',
      nomeFantasia: 'KATIA',
      tipoPessoa: 'PJ',
      dataCadastro: '1542772800000',
      tipoCadastro: 1,
      emails: [],
      enderecos: [],
      telefones: [],
      pessoaJuridica: {
        id: 10905700,
        cnpj: '13484296000105',
      },
      clientes: {
        id: 145995,
      },
    }));

    // @ts-ignore
    geralApi.get = jest.fn(() => [
      {
        recnum: 633,
        codigo: 'A8',
        nomeCondicaoPagamento: 'ATAC P/ 1 DIA',
        descricao: 'ATAC P/ 1 DIA',
        parcelas: 1,
        periodo: 0,
        periodoEntrada: 1,
        valor: 9999999.99,
        documento: 'F',
        descontoMedio: 29.4,
        tipoPreco: 'A',
        parcelaCartao: 0,
        ativo: 'S',
        caf: ' ',
      },
      {
        recnum: 4,
        codigo: 'F',
        codigo1: 4,
        descricao: 'Faturamento',
        descricao1: 'FATURAMENTO',
        obs: ' ',
        de_est_contrib: 'C',
        de_est_ncontrib: 'C',
        fo_est_contrib: 'C',
        caf: ' ',
      },
      {
        recnum: 1541,
        codigo: 'D54',
        nomeCondicaoPagamento: '07/14/21/28/35',
        descricao: 'PARA 07/14/21/28/35 DIAS',
        parcelas: 5,
        periodo: 7,
        periodoEntrada: 7,
        valor: 9999999.99,
        documento: 'F',
        descontoMedio: 24.5,
        tipoPreco: 'N',
        parcelaCartao: 0,
        ativo: 'S',
        caf: ' ',
      },
    ]);

    const cliente = createTestClient(server);

    const res = await cliente.query({
      query: gql`
        query {
          getPedbyCode(setPedPDF: { codPedido: 492, cpfCnpj: "13484296000105" }) {
            codpedido
            situacao
            total
            qtdItens
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
    expect(res.data.getPedbyCode[0]).toHaveProperty('codpedido');
  });

  it('Should return request by code and cpfcnpj delivered', async () => {
    const dbMocks = await {
      Pedido: {
        model: {
          codpedido: 287,
          codfilial: 34,
          codcliente: 145995,
          codfuncionario: 123,
          condicao: 'XXXXXXX',
          emissao: Date.now(),
          situacao: 'E',
          total: 200,
          observacao: ' ',
          ordemcompra: '1234984',
          pedidos_itens: [
            {
              codpedido: 287,
              codpedidoitem: 308,
              fornecedor_emp: 1,
              fornecedor_cod: 1416,
              vl_item: 50,
              produto: '15W40 SELENIA K',
              quantidade: 4,
              vl_total: 50 * 4,
              unidade: 'CX',
              embalagem: 24,
              qtd_estoque: 3310,
            },
          ],
        },
      },
    };

    const { server, pedidoService, pessoaApi, catalogoApi, geralApi } = constructTestServer({
      authorization: true,
      dbMocks,
    });

    // @ts-ignore
    catalogoApi.post = jest.fn(() => [
      {
        codigo: '1___1416___15W40 SELENIA K',
        nome: 'LITRO OLEO SELENIA K 15W40 SN PETRONAS',
      },
    ]);

    // @ts-ignore
    pedidoService.getCached = jest.fn(() => []);

    // @ts-ignore
    pessoaApi.get = jest.fn(() => ({
      nomeCompleto: 'KATIA',
      nomeFantasia: 'KATIA',
      tipoPessoa: 'PJ',
      dataCadastro: '1542772800000',
      tipoCadastro: 1,
      emails: [],
      enderecos: [],
      telefones: [],
      pessoaJuridica: {
        id: 10905700,
        cnpj: '13484296000105',
      },
      clientes: {
        id: 145995,
      },
    }));

    // @ts-ignore
    geralApi.get = jest.fn(() => [
      {
        recnum: 633,
        codigo: 'A8',
        nomeCondicaoPagamento: 'ATAC P/ 1 DIA',
        descricao: 'ATAC P/ 1 DIA',
        parcelas: 1,
        periodo: 0,
        periodoEntrada: 1,
        valor: 9999999.99,
        documento: 'F',
        descontoMedio: 29.4,
        tipoPreco: 'A',
        parcelaCartao: 0,
        ativo: 'S',
        caf: ' ',
      },
      {
        recnum: 4,
        codigo: 'F',
        codigo1: 4,
        descricao: 'Faturamento',
        descricao1: 'FATURAMENTO',
        obs: ' ',
        de_est_contrib: 'C',
        de_est_ncontrib: 'C',
        fo_est_contrib: 'C',
        caf: ' ',
      },
      {
        recnum: 1541,
        codigo: 'D54',
        nomeCondicaoPagamento: '07/14/21/28/35',
        descricao: 'PARA 07/14/21/28/35 DIAS',
        parcelas: 5,
        periodo: 7,
        periodoEntrada: 7,
        valor: 9999999.99,
        documento: 'F',
        descontoMedio: 24.5,
        tipoPreco: 'N',
        parcelaCartao: 0,
        ativo: 'S',
        caf: ' ',
      },
    ]);

    const cliente = createTestClient(server);

    const res = await cliente.query({
      query: gql`
        query {
          getPedbyCode(setPedPDF: { codPedido: 492, cpfCnpj: "13484296000105" }) {
            codpedido
            situacao
            total
            qtdItens
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
    expect(res.data.getPedbyCode[0]).toHaveProperty('codpedido');
  });
});
