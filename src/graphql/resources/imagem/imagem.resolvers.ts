import { ResolverContext } from '../../../interfaces/ResolverContextInterface';
import { authResolvers } from '../../composable/auth.resolver';
import { handleError, gqlCompose } from '../../../utils/utils';

export const imagemResolvers = {
  Query: {
    getImagem: gqlCompose(...authResolvers)(
      async (parent, { CodFornecedor, CodProduto }, { dataSources }: ResolverContext, info) => {
        return dataSources.imagemApi.searchImagem(CodFornecedor, CodProduto).catch(handleError);
      },
    ),
  },
};
