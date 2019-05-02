import { gqlCompose } from '../../../utils/utils';
import { authResolvers } from '../../composable/auth.resolver';
import { ResolverContext } from '../../../interfaces/ResolverContextInterface';

export const pessoaResolvers = {
  Query: {
    getPessoa: gqlCompose(...authResolvers)(
      async (parent, args, { dataSources }: ResolverContext) => {
        const endpoint =
          args.text.length > 11
            ? dataSources.pessoaApi.searchPessoaJuridica
            : dataSources.pessoaApi.searchPessoa;
        const pessoa = await endpoint.call(dataSources.pessoaApi, args.text);
        return pessoa;
      },
    ),
  },
  PessoaCadastro: {
    __resolveType(obj, context, info) {
      if (obj.cpf) {
        return 'PessoaFisica';
      } else if (obj.cnpj) {
        return 'PessoaJuridica';
      } else {
        return null;
      }
    },
  },
};
