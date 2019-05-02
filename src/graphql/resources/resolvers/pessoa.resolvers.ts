import { handleError, gqlCompose } from '../../../utils/utils';
import { authResolvers } from '../../composable/auth.resolver';
import { ResolverContext } from '../../../interfaces/ResolverContextInterface';

export const pessoaResolvers = {
  Query: {
    getPessoa: gqlCompose(...authResolvers)(
      async (parent, args, { dataSources }: ResolverContext) => {
        const cpf = Object.assign({ args });
        return dataSources.pessoaApi.searchPessoa(cpf).catch(handleError);
      },
    ),
  },
};
