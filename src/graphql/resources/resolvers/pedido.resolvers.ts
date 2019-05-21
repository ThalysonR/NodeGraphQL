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
    findOrdersByCliente: gqlCompose(...authResolvers)(
      async (parent, { codCliente }, { dataSources }: ResolverContext, info) => {
        return await dataSources.pedidoService.findPedidoByCliente(codCliente);
      },
    ),
    searchOrder: gqlCompose(...authResolvers)(
      async (parent, codPedido, { dataSources }: ResolverContext, info) => {
        return codPedido;
      },
    ),
  },
};
