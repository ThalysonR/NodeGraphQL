import { createTestClient } from 'apollo-server-testing';
import { constructTestServer } from '../../__utils';
import { gql } from 'apollo-server';

describe('Pedido Test', () => {
  it('Should return pedido', async () => {
    const dbMocks = {
      Pedido: {
        model: {
          codpedido: 123,
          codfilial: 34,
          codcliente: 123,
          codfuncionario: 123,
          condicao: 'A',
          emissao: Date.now(),
          situacao: 'A',
          total: 54.35,
          observacao: ' ',
          ordemcompra: '1234984',
        },
      },
    };

    const { server, pedidoService } = constructTestServer({ authorization: true, dbMocks });

    // @ts-ignore
    pedidoService.getCached = jest.fn(() => []);

    const client = createTestClient(server);
    const res = await client.query({
      query: gql`
        {
          findOrdersByCliente(codCliente: 123) {
            codpedido
          }
        }
      `,
    });
    // @ts-ignore
    expect(res.data.findOrdersByCliente).toEqual([]);
  });
});
