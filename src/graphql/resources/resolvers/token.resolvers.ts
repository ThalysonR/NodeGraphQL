import {ERROR} from '../../../environment';
import {createTokens} from '../../../authentication/handleTokens';
import {ResolverContext} from '../../../interfaces/ResolverContextInterface';
import {graphql} from 'graphql';
import {makeExecutableSchema} from 'graphql-tools'
import {resolvers, typeDefs} from '../../schema';

export const tokenResolvers = {
  Mutation: {
    createToken: async (parent: any, {login, senha}: any, {db, dataSources}: ResolverContext) => {
      if (!login || !senha) {
        throw new Error(ERROR.USER.EMPTY_CREDENTIALS);
      }

      const cpfCnpj = login.toString().replace(/[^0-9]+/g, '');

      if (cpfCnpj.length !== 11 && cpfCnpj.length !== 14) {
        throw new Error(ERROR.USER.WRONG_CREDENTIALS);
      }

      return db.Usuario.findOne({
        where: {login: cpfCnpj},
        attributes: ['id_usuario', 'senha', 'login', 'email', 'status_usuario'],
        include: [
          {
            model: db.Perfil,
            through: {
              attributes: ['nome_perfil'],
            },
            as: 'perfis',
          },
        ],
      }).then(async usuario => {
        if (!usuario || !usuario.isPassword(usuario.get('senha'), senha)) {
          throw new Error(ERROR.USER.WRONG_CREDENTIALS);
        }

        /* istanbul ignore if */
        if (usuario.get('status_usuario') !== "A") {
          throw new Error(ERROR.USER.WRONG_CREDENTIALS);
        }

        const usuarioId = usuario.get('id_usuario');

        /* istanbul ignore if */
        if(!usuario.perfis[0]){
          throw new Error(ERROR.USER.EMPTY_PERFIL);
        }

        const [newToken, newRefreshToken] = await createTokens({id: usuarioId});

        let pessoa: any = {};

        const schema = makeExecutableSchema({typeDefs, resolvers});

        const queryGetPessoa = `{getPessoa(text: "${cpfCnpj}"){id nomeCompleto nomeFantasia tipoPessoa saldo{saldo} pessoaCadastro{...on PessoaFisica{cpf} ...on PessoaJuridica{cnpj}}}}`;

        await graphql(schema, queryGetPessoa, null, {
          authUser: usuarioId,
          authorization: `Bearer ${newToken}`,
          dataSources
        })
          .then((resp: any) => {
            if (!resp.data) {
              throw new Error(ERROR.USER.DOES_NOT_EXIST);
            }
            pessoa = resp.data.getPessoa;
          });

        return {
          token: newToken,
          refreshToken: newRefreshToken,
          usuario: {
            login: usuario.login,
            email: usuario.email,
            pessoa: {
              nomeCompleto: pessoa.nomeCompleto,
              nomeFantasia: pessoa.nomeFantasia,
              tipoPessoa: pessoa.tipoPessoa,
              saldo: {
                saldo: pessoa.saldo.saldo
              },
              pessoaCadastro: pessoa.tipoPessoa === "PF" ? {cpf: pessoa.pessoaCadastro.cpf} : {cnpj: pessoa.pessoaCadastro.cnpj}
            },
            perfil: {
              nome_perfil: usuario.perfis[0].nome_perfil
            }
          }
        };
      });
    }
  }
};
