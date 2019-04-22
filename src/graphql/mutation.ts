import { usuarioMutations } from './resources/usuario/usuario.schema';
import {tokenMutations} from "./resources/token/token.schema";
import { produtoMutations } from './resources/catalogo/catalogo.schema'

const Mutation = `
    type Mutation {
        ${usuarioMutations},
        ${tokenMutations},
        ${produtoMutations}
    }
`;

export {
    Mutation
}