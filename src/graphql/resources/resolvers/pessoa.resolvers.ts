import { gqlCompose, mapDynamicFields, handleError } from '../../../utils/utils';
import { authResolvers } from '../../composable/auth.resolver';
import { ResolverContext } from '../../../interfaces/ResolverContextInterface';

const getPessoaDinamicos = {
  'getPessoa.saldo': async (args, { dataSources }: ResolverContext, pessoa) => {
    const cpfCnpj = pessoa.pessoaCadastro
      ? pessoa.pessoaCadastro.cpf || pessoa.pessoaCadastro.cnpj
      : null;
    let saldo = {};
    if (!cpfCnpj) {
      saldo = { limite: 0, emAberto: 0, saldo: 0, aviso: null, permissao: null, bloqueado: '' };
    } else {
      saldo = await dataSources.geralApi.findSaldoClienteByCpfCnpj(cpfCnpj);
      saldo = { ...saldo, emAberto: saldo['em_aberto'] };
    }
    return { ...pessoa, saldo };
  },
};

export const pessoaResolvers = {
  Query: {
    getPessoa: gqlCompose(...authResolvers)(
      async (parent, args, context: ResolverContext, info) => {
        const pessoa = await context.dataSources.pessoaApi.searchPessoa(args.text);
        const mappedPessoa = await mapDynamicFields(
          getPessoaDinamicos,
          args,
          context,
          info,
          pessoa,
        );
        return mappedPessoa;
      },
    ),
    getCondicao: gqlCompose(...authResolvers)(
      async (parent, { buscaCondicao }, { dataSources }: ResolverContext, info) => {
        return dataSources.geralApi.searchCondicao(buscaCondicao).catch(handleError);
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
