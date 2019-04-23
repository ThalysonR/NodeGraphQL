import { ResolverContext } from '../../../interfaces/ResolverContextInterface';

export const precoResolvers = {
    Query: {
        getPrecos: (parent, { buscaProdutos }, { dataSources }: ResolverContext, info) => {
            return dataSources.precoApi.buscaListaProdutosEstoquePreco(buscaProdutos);
        }
    }
};