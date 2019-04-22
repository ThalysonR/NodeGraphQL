import { handleError } from "../../../utils/utils";
import { authResolvers } from "../../composable/auth.resolver";
import { compose } from '../../../utils/utils';
import { GraphQLFieldResolver } from "graphql";

export const usuarioResolvers = {
    Query: {
        getUsuarios: compose<GraphQLFieldResolver<any, any>>(...authResolvers)((parent: any, args: any, context: any) => {
            return context.db.Usuario
                .findAll({
                    attributes: ['id_usuario', 'nome_usuario', 'login']
                }).catch(handleError);
        })
    }
};