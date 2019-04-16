import {handleError} from "../../../utils/utils";
import {authResolvers} from "../../composable/auth.resolver";
import {compose} from "../../composable/composable.resolver";

export const usuarioResolvers = {
    Query: {
        getUsuarios: compose(...authResolvers)((parent: any, args: any, context: any) => {
            return context.db.Usuario
                .findAll({
                    attributes: ['id_usuario', 'nome_usuario', 'login']
                }).catch(handleError);
        })
    }
};