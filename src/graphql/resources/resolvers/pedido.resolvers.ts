import { authResolvers } from '../../composable/auth.resolver';
import { gqlCompose } from '../../../utils/utils';
import { ResolverContext } from '../../../interfaces/ResolverContextInterface';

export const pedidoResolvers = {
  Mutation: {
    createOrder: gqlCompose(...authResolvers)(
      (parent, { setPedido }, { dataSources }: ResolverContext, info) => {
        return dataSources.pedidoService.createOrder(setPedido);
      },
    ),
  },
  Query: {
    searchOrder: gqlCompose(...authResolvers)(
      async (parent, codPedido, { dataSources }: ResolverContext, info) => {
        return codPedido;
      },
    ),
  },
};
