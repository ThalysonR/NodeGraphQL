import { typeDefs, resolvers } from '../src/graphql/schema';
import { ApolloServer, gql } from 'apollo-server';
import * as jwt from 'jsonwebtoken';
import * as dataSources from '../src/graphql/resources/datasources';
import getConfig from '../src/environment/datasources.config';
import { DataSources as B2BDataSources } from '../src/interfaces/DataSourcesInterface';
import { DataSources } from 'apollo-server-core/dist/graphqlOptions';
import { JWT_TOKEN_SECRET } from '../src/utils/utils';

/**
 * Função auxiliar para criar um servidor de teste para o graphql
 * @param authorization Boolean - indica se deve ser inserido autorização no contexto
 * @param param1
 */
export const constructTestServer = (authorization: boolean = false, { db = {} }: any = {}) => {
  const dtSourceConfig = getConfig();

  const apis = {
    catalogoApi: new dataSources.CatalogoAPI(dtSourceConfig),
    precoApi: new dataSources.PrecoAPI(dtSourceConfig),
    geralApi: new dataSources.GeralAPI(dtSourceConfig),
    imagemApi: new dataSources.ImagemAPI(dtSourceConfig),
    pessoaApi: new dataSources.PessoaApi(dtSourceConfig),
    pedidoService: new dataSources.PedidoService(),
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
    context: () => ({ ...authOpts, db }),
  });

  return { server, ...apis };
};
