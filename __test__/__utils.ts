import { typeDefs, resolvers } from '../src/graphql/schema';
import { ApolloServer, gql } from 'apollo-server';
import * as dataSources from '../src/graphql/resources/datasources';
import getConfig from '../src/environment/datasources.config';

export const constructTestServer = ({ authUser = {}, authorization = {}, db = {} }: any = {}) => {
  const dtSourceConfig = getConfig();

  const apis = {
    catalogoApi: new dataSources.CatalogoAPI(dtSourceConfig),
    precoApi: new dataSources.PrecoAPI(dtSourceConfig),
    geralApi: new dataSources.GeralAPI(dtSourceConfig),
    imagemApi: new dataSources.ImagemAPI(dtSourceConfig),
    pessoaApi: new dataSources.PessoaApi(dtSourceConfig),
  };

  const server = new ApolloServer({
    typeDefs: gql`
      ${typeDefs}
    `,
    resolvers,
    dataSources: () => apis,
    context: () => ({ authUser, authorization, db }),
  });

  return { server, ...apis };
};
