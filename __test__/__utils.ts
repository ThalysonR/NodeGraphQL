import { typeDefs, resolvers } from '../src/graphql/schema';
import { ApolloServer, gql } from 'apollo-server';
import * as dataSources from '../src/graphql/resources/datasources';
import getConfig from '../src/environment/datasources.config';
import { DataSources as B2BDataSources } from '../src/interfaces/DataSourcesInterface';
import { DataSources } from 'apollo-server-core/dist/graphqlOptions';

export const constructTestServer = ({ authUser = {}, authorization = {}, db = {} }: any = {}) => {
  const dtSourceConfig = getConfig();

  const apis: DataSources<B2BDataSources> = {
    catalogoApi: new dataSources.CatalogoAPI(dtSourceConfig),
    precoApi: new dataSources.PrecoAPI(dtSourceConfig),
    geralApi: new dataSources.GeralAPI(dtSourceConfig),
    imagemApi: new dataSources.ImagemAPI(dtSourceConfig),
    pessoaApi: new dataSources.PessoaApi(dtSourceConfig),
    // @ts-ignore
    pedidoService: new dataSources.PedidoService(),
  };

  const server = new ApolloServer({
    typeDefs: gql`
      ${typeDefs}
    `,
    resolvers,
    dataSources: (): DataSources<B2BDataSources> => apis,
    context: () => ({ authUser, authorization, db }),
  });

  return { server, ...apis };
};
