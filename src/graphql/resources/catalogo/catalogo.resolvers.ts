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
    getAplicacoes: gqlCompose(...authResolvers)(
      async (parent, { buscaAplicacoes }, { dataSources }: ResolverContext, info) => {
        return dataSources.catalogoApi.searchAplicacoes(buscaAplicacoes).catch(handleError);
      },
    ),
    getSimilar: gqlCompose(...authResolvers)(
      async (parent, { buscaSimilar }, { dataSources }: ResolverContext, info) => {
        return dataSources.catalogoApi.searchSimilar(buscaSimilar).catch(handleError);
      },
    ),
    getcliente: gqlCompose(...authResolvers)(
      async (parent, args, { dataSources }: ResolverContext) => {
        const cliente = Object.assign({ args });
        return dataSources.catalogoApi.searchCliente(cliente).catch(handleError);
      },
    ),
    getAutocomplete: gqlCompose(...authResolvers)(
      async (parent, args, { dataSources }: ResolverContext) => {
        const autocomplete = Object.assign({ args });
        return dataSources.catalogoApi.searchAutocomplete(autocomplete).catch(handleError);
      },
    ),
  },
};
