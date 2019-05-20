import { createTestClient } from 'apollo-server-testing';
import { constructTestServer } from '../../__utils';
import { gql } from 'apollo-server';

describe('Pedido Test', () => {
  it('Should return pedido', async () => {
    const { server, pedidoService } = constructTestServer(true);

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
