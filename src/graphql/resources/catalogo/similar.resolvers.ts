import { ResolverContext } from '../../../interfaces/ResolverContextInterface';
import { authResolvers } from '../../composable/auth.resolver';
import { handleError, gqlCompose } from '../../../utils/utils';

export const similarResolvers = {
  Query: {
    getSimilar: gqlCompose(...authResolvers)(
      async (parent, { buscaSimilar }, { dataSources }: ResolverContext, info) => {
        return dataSources.similarApi.searchSimilar(buscaSimilar).catch(handleError);
      },
    ),
  },
};
