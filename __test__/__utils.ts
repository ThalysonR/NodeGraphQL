import { typeDefs, resolvers } from '../src/graphql/schema'
import { ApolloServer, gql } from 'apollo-server'
import * as dataSources from '../src/graphql/datasource'

export const constructTestServer = () => {
  const apis = {
    catalogoApi: new dataSources.CatalogoAPI(),
    precoApi: new dataSources.PrecoAPI(),
    clienteApi: new dataSources.ClienteAPI(),
    geralApi: new dataSources.GeralAPI(),
    aplicacoesApi: new dataSources.AplicacoesAPI(),
  }

  const server = new ApolloServer({
    typeDefs: gql`
      ${typeDefs}
    `,
    resolvers,
    dataSources: () => apis,
  })

  return { server, ...apis }
}
