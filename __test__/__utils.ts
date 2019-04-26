import { typeDefs, resolvers } from '../src/graphql/schema';
import { ApolloServer, gql } from 'apollo-server';
import * as dataSources from '../src/graphql/datasource';

export const constructTestServer = ({ authUser = {}, authorization = {} }: any = {}) => {
  const apis = {
    catalogoApi: new dataSources.CatalogoAPI(),
    precoApi: new dataSources.PrecoAPI(),
    clienteApi: new dataSources.ClienteAPI(),
    geralApi: new dataSources.GeralAPI(),
    aplicacoesApi: new dataSources.AplicacoesAPI(),
    similarApi: new dataSources.SimilarApi(),
    imagemApi: new dataSources.ImagemApi(),
  };

  const server = new ApolloServer({
    typeDefs: gql`
      ${typeDefs}
    `,
    resolvers,
    dataSources: () => apis,
    context: () => ({ authUser, authorization }),
  });

  return { server, ...apis };
};
