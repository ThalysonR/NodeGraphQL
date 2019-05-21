import { ERROR } from '../../../environment';
import { createTokens } from '../../../authentication/handleTokens';
import { ResolverContext } from '../../../interfaces/ResolverContextInterface';

export const tokenResolvers = {
  Mutation: {
    createToken: async (parent: any, { login, senha }: any, { dataSources }: ResolverContext) => {
      if (!login || !senha) {
        throw new Error(ERROR.USER.EMPTY_CREDENTIALS);
      }
      const cpfCnpj = login.toString().replace(/[^0-9]+/g, '');
      if (cpfCnpj.length !== 11 && cpfCnpj.length !== 14) {
        throw new Error(ERROR.USER.WRONG_CREDENTIALS);
      }

      const usuario = await dataSources.usuarioService.findUserByLogin(cpfCnpj);
      /* istanbul ignore if */
      if (!usuario || !usuario.isPassword(usuario.get('senha'), senha)) {
        throw new Error(ERROR.USER.WRONG_CREDENTIALS);
      }
      /* istanbul ignore if */
      if (usuario.get('status_usuario') !== 'A') {
        throw new Error(ERROR.USER.WRONG_CREDENTIALS);
      }
      const usuarioId = usuario.get('id_usuario');

      /* istanbul ignore if */
      if (!usuario.perfis[0]) {
        throw new Error(ERROR.USER.EMPTY_PERFIL);
      }
      const [newToken, newRefreshToken] = await createTokens({ id: usuarioId });
      const pessoa = await dataSources.pessoaApi.searchPessoa(cpfCnpj);
      /* istanbul ignore if */
      if (!pessoa) {
        throw new Error(ERROR.USER.DOES_NOT_EXIST);
      }
      const saldo = await dataSources.geralApi.findSaldoClienteByCpfCnpj(cpfCnpj);
      const objFinal = {
        token: newToken,
        refreshToken: newRefreshToken,
        usuario: {
          login: usuario.login,
          email: usuario.email,
          pessoa: {
            nomeCompleto: pessoa.nomeCompleto,
            nomeFantasia: pessoa.nomeFantasia,
            tipoPessoa: pessoa.tipoPessoa,
            saldo,
            pessoaCadastro:
              pessoa.tipoPessoa === 'PF'
                ? { cpf: pessoa.pessoaCadastro.cpf }
                : { cnpj: pessoa.pessoaCadastro.cnpj },
          },
          perfil: {
            nome_perfil: usuario.perfis[0].nome_perfil,
          },
        },
      };
      return objFinal;
    },
  },
};
