import * as jwt from 'jsonwebtoken';

import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { JWT_SECRET } from '../../../utils/utils';

export const tokenResolvers = {

    Mutation: {
        createToken: (parent: any, { login, senha } : any, {db}: {db: DbConnection}) => {

            return db.Usuario.findOne({
                where: {login},
                attributes: ['id_usuario', 'senha']
            }).then((usuario) => {
                db.sequelize.close();

                const errorMessage: string = 'As informações de login ou senha estão incorretas!';
                if (!usuario || !usuario.isPassword(usuario.get('senha'), senha)) { throw new Error(errorMessage); }

                const payload = {sub: usuario.get('id_usuario')};

                return {
                    token: jwt.sign(payload, JWT_SECRET)
                }
            });
        }
    }
};