import { ResolverContext } from '../../../interfaces/ResolverContextInterface';

export const similarResolvers = {
  Query: {
    getSimilar: (parent, { buscaSimilar }, { dataSources }: ResolverContext, info) => {
      return dataSources.similarApi.searchSimilar(buscaSimilar);
    },
  },
};
