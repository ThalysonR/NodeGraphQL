import { ResolverContext } from '../../../interfaces/ResolverContextInterface';
import { authResolvers } from '../../composable/auth.resolver';
import { handleError, gqlCompose } from '../../../utils/utils';

export const clienteResolvers = {
  Query: {
    getcliente: gqlCompose(...authResolvers)(
      async (parent, args, { dataSources }: ResolverContext) => {
        const cliente = Object.assign({ args });
        return dataSources.clienteApi.searchCliente(cliente).catch(handleError);
      },
    ),
  },
};
