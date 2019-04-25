import { ResolverContext } from '../../../interfaces/ResolverContextInterface';
import { handleError, gqlCompose } from '../../../utils/utils';
import { authResolvers } from '../../composable/auth.resolver';

export const aplicacoesResolvers = {
  Query: {
    getAplicacoes: gqlCompose(...authResolvers)(
      async (parent, { buscaAplicacoes }, { dataSources }: ResolverContext, info) => {
        return dataSources.aplicacoesApi.searchAplicacoes(buscaAplicacoes).catch(handleError);
      },
    ),
  },
};
