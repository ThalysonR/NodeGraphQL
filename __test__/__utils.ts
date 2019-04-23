import { typeDefs, resolvers } from '../src/graphql/schema';
import { ApolloServer, gql } from 'apollo-server';
import * as dataSources from '../src/graphql/datasource';

export const constructTestServer = () => {
    const catalogoApi = new dataSources.CatalogoAPI();
    const precoApi = new dataSources.PrecoAPI();

    const server = new ApolloServer({
        typeDefs: gql`${typeDefs}`,
        resolvers,
        dataSources: () => ({ catalogoApi, precoApi }),
    });

    return { server, catalogoApi, precoApi };
}