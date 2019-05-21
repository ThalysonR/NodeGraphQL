import { constructTestServer } from '../../__utils';
import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server';

describe('Test usuario resolvers', () => {
  const dbMocks = {
    Usuario: {
      model: {
        id_usuario: 1,
        nome_usuario: 'thalyson',
        login: 'thalyson',
        email: 'teste@teste.com',
        senha: 123456,
      },
    },
  };
  const { server } = constructTestServer(true, dbMocks);

  it('Should return all users', async () => {
    const client = createTestClient(server);
    const res = await client.query({
      query: gql`
        {
          getUsuarios {
            email
          }
        }
      `,
    });
    // @ts-ignore
    expect(res.data.getUsuarios[0].email).toBe('teste@teste.com');
  });

  it('Should return check auth', async () => {
    const client = createTestClient(server);
    const res = await client.query({
      query: gql`
        {
          checkAuth
        }
      `,
    });
    // @ts-ignore
    expect(res.data.checkAuth).toBe(true);
  });
});
