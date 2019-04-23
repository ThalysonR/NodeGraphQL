import {DbConnection} from "../../../interfaces/DbConnectionInterface";
import {ERROR} from '../../../environment';
import {createTokens} from "../../../authentication/handleTokens";

export const tokenResolvers = {

    Mutation: {
        createToken: (parent: any, {login, senha}: any, {db}: { db: DbConnection }) => {
            return db.Usuario.findOne({
                where: {login},
                attributes: ['id_usuario', 'senha'],
                include: [{
                    model: db.Perfil,
                    through: {
                        attributes: ['nome_perfil']
                    },
                    as: 'perfis'
                }]
            }).then(async (usuario) => {
                if (!usuario || !usuario.isPassword(usuario.get('senha'), senha)) {
                    throw new Error(ERROR.USER.WRONG_CREDENTIALS);
                }

                const usuarioId = usuario.get('id_usuario');

                const [newToken, newRefreshToken] = await createTokens({id: usuarioId});

                return {
                    token: newToken,
                    refreshToken: newRefreshToken,
                    usuario: {
                        perfil: {
                            nome_perfil: usuario.perfis[0] != null ? usuario.perfis[0].nome_perfil : ''
                        }
                    }
                }
            })
        }
    }
};