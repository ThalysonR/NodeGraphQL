import { usuarioMutations } from './resources/usuario/usuario.schema';
import { tokenMutations } from "./resources/token/token.schema";

const Mutation = `
    type Mutation {
        ${usuarioMutations},
        ${tokenMutations},
    }
`;

export {
    Mutation
}