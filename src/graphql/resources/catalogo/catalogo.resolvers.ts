import { CatalogoAPI } from '../../datasource'

export const catalogoResolvers = {
    Mutation: {
        getproduto: async (parent, args, {dataSources}) => {
            const produto = Object.assign({args});
            return new CatalogoAPI().searchProduto(produto);
        }
    }
};
