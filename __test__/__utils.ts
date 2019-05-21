import { typeDefs, resolvers } from '../src/graphql/schema';
import { ApolloServer, gql } from 'apollo-server';
import * as jwt from 'jsonwebtoken';
import * as dataSources from '../src/graphql/resources/datasources';
import getConfig from '../src/environment/datasources.config';
import { DataSources as B2BDataSources } from '../src/interfaces/DataSourcesInterface';
import { DataSources } from 'apollo-server-core/dist/graphqlOptions';
import { JWT_TOKEN_SECRET } from '../src/utils/utils';
import SequelizeMock from 'sequelize-mock';
import { DbMockInterface } from '../src/interfaces/DbMockInterface';

/**
 * Função auxiliar para criar um servidor de teste para o graphql
 * @param authorization Boolean - indica se deve ser inserido autorização no contexto
 * @param param1
 */
export const constructTestServer = (
  authorization: boolean = false,
  mocks: DbMockInterface = {},
) => {
  const dtSourceConfig = getConfig();

  const dbMocks = buildSqlizeMocks(mocks);

  const apis = {
    catalogoApi: new dataSources.CatalogoAPI(dtSourceConfig),
    precoApi: new dataSources.PrecoAPI(dtSourceConfig),
    geralApi: new dataSources.GeralAPI(dtSourceConfig),
    imagemApi: new dataSources.ImagemAPI(dtSourceConfig),
    pessoaApi: new dataSources.PessoaApi(dtSourceConfig),
    pedidoService: new dataSources.PedidoService(dbMocks),
    usuarioService: new dataSources.UsuarioService(dbMocks),
  };

  let authOpts = {};
  if (authorization) {
    authOpts = {
      authUser: 1,
      authorization: `Bearer: ${jwt.sign('123456', JWT_TOKEN_SECRET)}`,
    };
  }

  const server = new ApolloServer({
    typeDefs: gql`
      ${typeDefs}
    `,
    resolvers,
    dataSources: (): DataSources<B2BDataSources> => apis,
    context: () => ({ ...authOpts }),
  });

  return { server, ...apis, dbMocks };
};

function buildSqlizeMocks(mocks: DbMockInterface) {
  const dbMock = new SequelizeMock();
  const builtMocks = {};
  for (const mockName in mocks) {
    if (mocks.hasOwnProperty(mockName)) {
      builtMocks[mockName] = dbMock.define(
        mockName,
        mocks[mockName].model,
        mocks[mockName].options,
      );
    }
  }
  return builtMocks;
}
