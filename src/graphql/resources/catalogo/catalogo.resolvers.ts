import { authResolvers } from '../../composable/auth.resolver';
import { handleError, gqlCompose } from '../../../utils/utils';
import { ResolverContext } from '../../../interfaces/ResolverContextInterface';

export const catalogoResolvers = {
  Query: {
    getproduto: gqlCompose(...authResolvers)(
      async (parent, args, { dataSources }: ResolverContext) => {
        const produto = Object.assign({ args });
        return dataSources.catalogoApi.searchProduto(produto).catch(handleError);
      },
    ),
  },
};
