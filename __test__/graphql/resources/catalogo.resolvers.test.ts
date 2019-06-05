import { gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import { constructTestServer } from '../../__utils';

describe('Test Catalog', () => {
  it('test on request response', async () => {
    const { server, catalogoApi, pessoaApi, precoApi, imagemApi, geralApi } = constructTestServer({
      authorization: true,
    });

    // @ts-ignore
    catalogoApi.get = jest.fn(() => ({
      produtos: {
        content: [
          {
            id: '64616',
            idEmpresa: '1',
            idFornecedor: '144',
            nomeFornecedor: 'COFAP',
            codigoProduto: 'B47097',
            codigoOriginalProduto: null,
            nomeProduto: 'AMORTECEDOR TRASEIRO COFAP',
            frequencia: 2182,
            codProduto: '1___144___B47097',
            score: null,
            tags: null,
            carType: null,
            carId: null,
            articleNo: null,
            manuId: null,
            models: [
              {
                nomeCarro: 'GOL',
                modelTipos: [
                  {
                    tipoNome: '1000',
                    geracao: 'I',
                    motor: '1.0',
                    anos: ['1992', '1993', '1994', '1995', '1996'],
                    nomeMotor: 'CHT',
                    modeloTransmissao: null,
                    eixoMotriz: null,
                  },
                ],
              },
            ],
            modeloCarro: 'PARATI',
            fabricante: null,
            anos: null,
            eixo: ['TRASEIRO'],
            posicao: [],
            lado: [],
            motor: null,
            combustivel: [],
            aplicacao: ['GOL', 'PARATI'],
            montadoras: ['VOLKSWAGEN'],
            prefixo: null,
            aro: null,
            perfil: null,
            viscosidade: null,
            amperagem: null,
          },
        ],
        pageable: {
          sort: {
            unsorted: true,
            sorted: false,
          },
          pageSize: 1,
          pageNumber: 0,
          offset: 0,
          unpaged: false,
          paged: true,
        },
        facets: [],
        aggregations: {
          fragment: true,
          asMap: {},
        },
        scrollId: null,
        totalPages: 4377,
        totalElements: 4377,
        sort: {
          unsorted: true,
          sorted: false,
        },
        first: true,
        last: false,
        numberOfElements: 1,
        size: 1,
        number: 0,
      },
      tags: ['GOL', 'PARATI'],
    }));
    // @ts-ignore
    pessoaApi.get = jest.fn(() => ({
      nomeCompleto: 'KATIA',
      nomeFantasia: 'KATIA',
      tipoPessoa: 'PF',
      dataCadastro: '1542772800000',
      tipoCadastro: 1,
      emails: [
        {
          id: 926562,
          descricao: 'antonio_igor13@hotmail.com',
          finalidade: 1,
          contato: 'NAO TEM',
        },
      ],
      enderecos: [
        {
          id: 319536,
          inscricaoEstadual: {
            id: 150005,
            inscricao: 'ISENTO',
            contribuinte: 'N',
            validContribuinte: true,
          },
          codPais: 1058,
          infobusca: 0,
          logradouro: 'RUA RIO CUNIUA',
          codUf: 13,
          codMunicipio: 1302603,
          cep: '69089180',
          bairro: 'ARMANDO MENDES',
          numero: '12',
          contato: '-',
          complemento: '-',
          tipo: 1,
          validInfoBusca: true,
          validTipoEndereco: true,
          numeroNulo: false,
          validTipoFiscal: false,
        },
      ],
      telefones: [
        {
          id: 1432263,
          numero: 222222222,
          ddd: 22,
          tipo: 3,
          contato: 'NAO TEM',
        },
      ],
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
        bloqueio: 'N',
        agruparNotas: 'N',
        cobrador: 'CAR',
        tipoPreco: 'N',
        cartaFianca: 'N',
        valorCarta: 0,
        prazoMedio: 0,
        conceito: 'XX',
        exignfdv: 'N',
        observacao: '-',
        limiteCredito: 0,
        tpEmpresa: '4',
        qtdElevador: 0,
        qtdMecanico: 0,
        qtdVeiculos: 0,
        qtdVendedor: 0,
        linhaLeve: 'S',
        linhaPesada: 'N',
        linhaMedia: 'N',
        linhaOutras: 'N',
        metragemAuto: 0,
        metragemOfic: 0,
        percentualAumento: 0,
      },
    }));
    // @ts-ignore
    precoApi.post = jest.fn(() => [
      {
        fornecedorCodigo: 144,
        empresa: 1,
        produto: 'B47097',
        unidade: [
          {
            preco: 113.5,
          },
        ],
      },
    ]);
    // @ts-ignore
    imagemApi.post = jest.fn(() => [
      {
        CodFornecedor: '144',
        CodProduto: 'B47097',
        ImgBase64: 'Imagem',
      },
    ]);
    // @ts-ignore
    geralApi.get = jest.fn(() => [
      {
        filial: 34,
        produto: 'B47097',
        qtd: 31,
        qtdInventario: 31,
      },
      {
        codigo: 'XXXXXXX',
      },
    ]);

    const { query } = createTestClient(server);

    const res = await query({
      query: gql`
        {
          getProdutos(
            pesqProduto: {
              page: 0
              count: 1
              order: "DESC"
              sort: "frequencia"
              nomeProduto: "B47097"
            }
          ) {
            produtos {
              id
              idEmpresa
              idFornecedor
              nomeFornecedor
              codigoProduto
              codigoOriginalProduto
              nomeProduto
              frequencia
              codProduto
              score
              tags
              carType
              carId
              articleNo
              manuId
              models {
                nomeCarro
                modelTipos {
                  tipoNome
                  geracao
                  motor
                  anos
                  nomeMotor
                  modeloTransmissao
                  eixoMotriz
                }
              }
              modeloCarro
              fabricante
              anos
              eixo
              posicao
              lado
              motor
              combustivel
              aplicacao
              montadoras
              prefixo
              aro
              perfil
              viscosidade
              amperagem
              unidade {
                preco
                qtd
              }
              imagem
              estoque {
                qtd
              }
            }
            tags
          }
        }
      `,
    });

    // @ts-ignore
    expect(res.data.getProdutos.produtos[0]).toHaveProperty('nomeProduto');
  });

  it('Should return empty image and preco when not found', async () => {
    const { server, catalogoApi, pessoaApi, precoApi, imagemApi, geralApi } = constructTestServer({
      authorization: true,
    });

    // @ts-ignore
    catalogoApi.get = jest.fn(() => ({
      produtos: {
        content: [
          {
            id: '64616',
            idEmpresa: '1',
            idFornecedor: '144',
            nomeFornecedor: 'COFAP',
            codigoProduto: 'B47097',
            codigoOriginalProduto: null,
            nomeProduto: 'AMORTECEDOR TRASEIRO COFAP',
            frequencia: 2182,
            codProduto: '1___144___B47097',
            score: null,
            tags: null,
            carType: null,
            carId: null,
            articleNo: null,
            manuId: null,
            models: [
              {
                nomeCarro: 'GOL',
                modelTipos: [
                  {
                    tipoNome: '1000',
                    geracao: 'I',
                    motor: '1.0',
                    anos: ['1992', '1993', '1994', '1995', '1996'],
                    nomeMotor: 'CHT',
                    modeloTransmissao: null,
                    eixoMotriz: null,
                  },
                ],
              },
            ],
            modeloCarro: 'PARATI',
            fabricante: null,
            anos: null,
            eixo: ['TRASEIRO'],
            posicao: [],
            lado: [],
            motor: null,
            combustivel: [],
            aplicacao: ['GOL', 'PARATI'],
            montadoras: ['VOLKSWAGEN'],
            prefixo: null,
            aro: null,
            perfil: null,
            viscosidade: null,
            amperagem: null,
          },
        ],
        pageable: {
          sort: {
            unsorted: true,
            sorted: false,
          },
          pageSize: 1,
          pageNumber: 0,
          offset: 0,
          unpaged: false,
          paged: true,
        },
        facets: [],
        aggregations: {
          fragment: true,
          asMap: {},
        },
        scrollId: null,
        totalPages: 4377,
        totalElements: 4377,
        sort: {
          unsorted: true,
          sorted: false,
        },
        first: true,
        last: false,
        numberOfElements: 1,
        size: 1,
        number: 0,
      },
      tags: ['GOL', 'PARATI'],
    }));
    // @ts-ignore
    pessoaApi.get = jest.fn(() => ({
      nomeCompleto: 'KATIA',
      nomeFantasia: 'KATIA',
      tipoPessoa: 'PF',
      dataCadastro: '1542772800000',
      tipoCadastro: 1,
      emails: [
        {
          id: 926562,
          descricao: 'antonio_igor13@hotmail.com',
          finalidade: 1,
          contato: 'NAO TEM',
        },
      ],
      enderecos: [
        {
          id: 319536,
          inscricaoEstadual: {
            id: 150005,
            inscricao: 'ISENTO',
            contribuinte: 'N',
            validContribuinte: true,
          },
          codPais: 1058,
          infobusca: 0,
          logradouro: 'RUA RIO CUNIUA',
          codUf: 13,
          codMunicipio: 1302603,
          cep: '69089180',
          bairro: 'ARMANDO MENDES',
          numero: '12',
          contato: '-',
          complemento: '-',
          tipo: 1,
          validInfoBusca: true,
          validTipoEndereco: true,
          numeroNulo: false,
          validTipoFiscal: false,
        },
      ],
      telefones: [
        {
          id: 1432263,
          numero: 222222222,
          ddd: 22,
          tipo: 3,
          contato: 'NAO TEM',
        },
      ],
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
        bloqueio: 'N',
        agruparNotas: 'N',
        cobrador: 'CAR',
        tipoPreco: 'N',
        cartaFianca: 'N',
        valorCarta: 0,
        prazoMedio: 0,
        conceito: 'XX',
        exignfdv: 'N',
        observacao: '-',
        limiteCredito: 0,
        tpEmpresa: '4',
        qtdElevador: 0,
        qtdMecanico: 0,
        qtdVeiculos: 0,
        qtdVendedor: 0,
        linhaLeve: 'S',
        linhaPesada: 'N',
        linhaMedia: 'N',
        linhaOutras: 'N',
        metragemAuto: 0,
        metragemOfic: 0,
        percentualAumento: 0,
      },
    }));
    // @ts-ignore
    precoApi.post = jest.fn(() => [
      {
        fornecedorCodigo: 144,
        empresa: 1,
        produto: 'B47098',
        unidade: [
          {
            preco: 113.5,
          },
        ],
      },
    ]);
    // @ts-ignore
    imagemApi.post = jest.fn(() => [
      {
        CodFornecedor: '144',
        CodProduto: 'Codigo errado',
        ImgBase64: 'Imagem',
      },
    ]);

    // @ts-ignore
    geralApi.get = jest.fn(() => [
      {
        codigo: 'XXXXXXX',
      },
    ]);

    const { query } = createTestClient(server);

    const res = await query({
      query: gql`
        {
          getProdutos(
            pesqProduto: {
              page: 0
              count: 1
              order: "DESC"
              sort: "frequencia"
              nomeProduto: "B47097"
              cpfCnpj: "0123456789"
            }
          ) {
            produtos {
              unidade {
                preco
                qtd
              }
              imagem
            }
          }
        }
      `,
    });

    // @ts-ignore
    expect(res.data.getProdutos.produtos[0].imagem).toBe('');
  });

  it('Should not make http calls for unused dynamic fields', async () => {
    const { server, catalogoApi, pessoaApi, precoApi, imagemApi } = constructTestServer({
      authorization: true,
    });
    const mockFn = jest.fn(() => [
      {
        fornecedorCodigo: 144,
        empresa: 1,
        produto: 'B47098',
        unidade: [
          {
            preco: 113.5,
          },
        ],
      },
    ]);
    // @ts-ignore
    catalogoApi.get = jest.fn(() => ({
      produtos: {
        content: [
          {
            id: '64616',
            idEmpresa: '1',
            idFornecedor: '144',
            nomeFornecedor: 'COFAP',
            codigoProduto: 'B47097',
            codigoOriginalProduto: null,
            nomeProduto: 'AMORTECEDOR TRASEIRO COFAP',
            frequencia: 2182,
            codProduto: '1___144___B47097',
            score: null,
            tags: null,
            carType: null,
            carId: null,
            articleNo: null,
            manuId: null,
            models: [
              {
                nomeCarro: 'GOL',
                modelTipos: [
                  {
                    tipoNome: '1000',
                    geracao: 'I',
                    motor: '1.0',
                    anos: ['1992', '1993', '1994', '1995', '1996'],
                    nomeMotor: 'CHT',
                    modeloTransmissao: null,
                    eixoMotriz: null,
                  },
                ],
              },
            ],
            modeloCarro: 'PARATI',
            fabricante: null,
            anos: null,
            eixo: ['TRASEIRO'],
            posicao: [],
            lado: [],
            motor: null,
            combustivel: [],
            aplicacao: ['GOL', 'PARATI'],
            montadoras: ['VOLKSWAGEN'],
            prefixo: null,
            aro: null,
            perfil: null,
            viscosidade: null,
            amperagem: null,
          },
        ],
        pageable: {
          sort: {
            unsorted: true,
            sorted: false,
          },
          pageSize: 1,
          pageNumber: 0,
          offset: 0,
          unpaged: false,
          paged: true,
        },
        facets: [],
        aggregations: {
          fragment: true,
          asMap: {},
        },
        scrollId: null,
        totalPages: 4377,
        totalElements: 4377,
        sort: {
          unsorted: true,
          sorted: false,
        },
        first: true,
        last: false,
        numberOfElements: 1,
        size: 1,
        number: 0,
      },
      tags: ['GOL', 'PARATI'],
    }));
    // @ts-ignore
    pessoaApi.get = jest.fn(() => ({
      nomeCompleto: 'KATIA',
      nomeFantasia: 'KATIA',
      tipoPessoa: 'PF',
      dataCadastro: '1542772800000',
      tipoCadastro: 1,
      emails: [
        {
          id: 926562,
          descricao: 'antonio_igor13@hotmail.com',
          finalidade: 1,
          contato: 'NAO TEM',
        },
      ],
      enderecos: [
        {
          id: 319536,
          inscricaoEstadual: {
            id: 150005,
            inscricao: 'ISENTO',
            contribuinte: 'N',
            validContribuinte: true,
          },
          codPais: 1058,
          infobusca: 0,
          logradouro: 'RUA RIO CUNIUA',
          codUf: 13,
          codMunicipio: 1302603,
          cep: '69089180',
          bairro: 'ARMANDO MENDES',
          numero: '12',
          contato: '-',
          complemento: '-',
          tipo: 1,
          validInfoBusca: true,
          validTipoEndereco: true,
          numeroNulo: false,
          validTipoFiscal: false,
        },
      ],
      telefones: [
        {
          id: 1432263,
          numero: 222222222,
          ddd: 22,
          tipo: 3,
          contato: 'NAO TEM',
        },
      ],
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
        bloqueio: 'N',
        agruparNotas: 'N',
        cobrador: 'CAR',
        tipoPreco: 'N',
        cartaFianca: 'N',
        valorCarta: 0,
        prazoMedio: 0,
        conceito: 'XX',
        exignfdv: 'N',
        observacao: '-',
        limiteCredito: 0,
        tpEmpresa: '4',
        qtdElevador: 0,
        qtdMecanico: 0,
        qtdVeiculos: 0,
        qtdVendedor: 0,
        linhaLeve: 'S',
        linhaPesada: 'N',
        linhaMedia: 'N',
        linhaOutras: 'N',
        metragemAuto: 0,
        metragemOfic: 0,
        percentualAumento: 0,
      },
    }));
    // @ts-ignore
    precoApi.post = mockFn;
    // @ts-ignore
    imagemApi.post = jest.fn(() => [
      {
        CodFornecedor: '144',
        CodProduto: 'Codigo errado',
        ImgBase64: 'Imagem',
      },
    ]);
    const { query } = createTestClient(server);

    await query({
      query: gql`
        {
          getProdutos(
            pesqProduto: {
              page: 0
              count: 1
              order: "DESC"
              sort: "frequencia"
              nomeProduto: "B47097"
              cpfCnpj: "0123456789"
            }
          ) {
            produtos {
              nomeProduto
            }
          }
        }
      `,
    });
    // @ts-ignore
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('catalog test and client endpoint', async () => {
    const { server, catalogoApi } = constructTestServer({ authorization: true });

    // @ts-ignore
    catalogoApi.get = jest.fn(() => ({
      clientes: {
        content: [
          {
            id: '02570039241',
            nome: 'KATIA',
            municipio: 'MANAUS',
            cnpj: null,
            cpf: '02570039241',
            estado: 'AMAZONAS',
            bairro: 'ARMANDO MENDES',
            endereco: 'RUA RIO CUNIUA 12',
            cep: '69089180',
          },
        ],
      },
    }));

    const { query } = createTestClient(server);

    const res = await query({
      query: gql`
        {
          getcliente(text: "Katia") {
            id
            nome
            municipio
            estado
            bairro
            endereco
            cep
          }
        }
      `,
    });

    // @ts-ignore
    expect(res.data.getcliente[0]).toHaveProperty('nome');
  });

  it('catalog application endpoint test', async () => {
    const { server, catalogoApi } = constructTestServer({ authorization: true });

    // @ts-ignore
    catalogoApi.get = jest.fn(() => ({
      listaDados: [
        {
          nomeCarro: 'ACCELO',
          modelTipos: [
            {
              tipoNome: '1016/31',
              geracao: '',
              motor: '4.8',
              anos: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
              nomeMotor: 'BLUETEC 5',
              modeloTransmissao: 'FSO 4505 HDA',
              eixoMotriz: 'HL2',
            },
          ],
        },
      ],
      pagina: 1,
      totalPorPagina: 1,
    }));

    const { query } = createTestClient(server);

    const res = await query({
      query: gql`
        {
          getAplicacoes(buscaAplicacoes: { page: 0, count: 1, codProduto: "1___1847___DNI0102" }) {
            listaDados {
              nomeCarro
              modelTipos {
                tipoNome
                geracao
                motor
                anos
                nomeMotor
                modeloTransmissao
                eixoMotriz
              }
            }
            pagina
            totalPorPagina
          }
        }
      `,
    });

    // @ts-ignore
    expect(res.data.getAplicacoes).toHaveProperty('listaDados');
  });

  it('similar catalog endpoint testing', async () => {
    const { server, catalogoApi } = constructTestServer({ authorization: true });

    // @ts-ignore
    catalogoApi.get = jest.fn(() => [
      {
        id: '452754',
        idEmpresa: '1',
        idFornecedor: '48',
        nomeFornecedor: 'AXIOS MONROE',
        codigoProduto: '334048MM',
        codigoOriginalProduto: null,
        nomeProduto: 'AMORTECEDOR TRASEIRO AXIOS MONROE',
        frequencia: 0,
        codProduto: '1___48___334048MM',
        score: null,
        tags: null,
        carType: null,
        carId: null,
        articleNo: null,
        manuId: null,
        models: [
          {
            nomeCarro: 'GOL',
            modelTipos: [
              {
                tipoNome: '1000',
                geracao: 'I',
                motor: '1.0',
                anos: ['1992', '1993', '1994', '1995', '1996'],
                nomeMotor: 'CHT',
                modeloTransmissao: null,
                eixoMotriz: null,
              },
            ],
          },
        ],
        modeloCarro: 'PARATI',
        fabricante: null,
        anos: null,
        eixo: ['TRASEIRO'],
        posicao: [],
        lado: [],
        motor: null,

        combustivel: [],
        aplicacao: ['GOL', 'GOL GTI', 'PARATI'],
        montadoras: ['VOLKSWAGEN'],
        prefixo: null,
        aro: null,
        perfil: null,
        viscosidade: null,
        amperagem: null,
      },
    ]);

    const { query } = createTestClient(server);

    const res = await query({
      query: gql`
        {
          getSimilares(
            pesqSimilar: { filial: 34, empresa: 1, fornecedor: 144, produto: "B47097" }
          ) {
            id
            idEmpresa
            idFornecedor
            nomeFornecedor
            codigoProduto
            codigoOriginalProduto
            nomeProduto
          }
        }
      `,
    });

    // @ts-ignore
    expect(res.data.getSimilares[0]).toHaveProperty('nomeProduto');
  });

  it('autocomplete endpoint test', async () => {
    const { server, catalogoApi } = constructTestServer({ authorization: true });

    // @ts-ignore
    catalogoApi.get = jest.fn(() => [
      {
        id: 0,
        descricao: 'ENVOLVENTE PARACHOQUE',
      },
      {
        id: 1,
        descricao: 'ENVOLVENTE PARACHOQUE ALMA DE ACO',
      },
    ]);

    const { query } = createTestClient(server);

    const res = await query({
      query: gql`
        {
          getAutocomplete(text: "envolve") {
            id
            descricao
          }
        }
      `,
    });

    // @ts-ignore
    expect(res.data.getAutocomplete[0]).toHaveProperty('descricao');
  });

  it('estoque endpoin test', async () => {
    const { server, geralApi } = constructTestServer({ authorization: true });

    // @ts-ignore
    geralApi.get = jest.fn(() => [
      {
        filial: 33,
        produto: '16001',
        qtd: 0,
        qtdInventario: 0,
        minimo: 0,
        maximo: 0,
        ativo: 'S',
        endereco: 'AV.KAKO CAMINHA',
      },
    ]);

    const { query } = createTestClient(server);

    const res = await query({
      query: gql`
        {
          getEstoque(buscaEstoque: { uf: "AM", produto: "16001", empresa: 1, fornecedor: 144 }) {
            filial
            produto
            qtd
            qtdInventario
            minimo
            maximo
            ativo
            endereco
          }
        }
      `,
    });

    // @ts-ignore
    expect(res.data.getEstoque[0]).toHaveProperty('produto');
  });
});
