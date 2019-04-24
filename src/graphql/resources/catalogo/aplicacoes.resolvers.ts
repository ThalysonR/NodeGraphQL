import { ResolverContext } from '../../../interfaces/ResolverContextInterface'

export const aplicacoesResolvers = {
  Query: {
    getAplicacoes: (
      parent,
      { buscaAplicacoes },
      { dataSources }: ResolverContext,
      info
    ) => {
      return dataSources.aplicacoesApi.searchAplicacoes(buscaAplicacoes)
    },
  },
}
