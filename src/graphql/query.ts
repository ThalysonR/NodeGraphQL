import { usuarioQueries } from './resources/usuario/usuario.schema';
import { produtoQueries } from './resources/catalogo/catalogo.schema';

const Query = `
    type Query {
        ${usuarioQueries},
        ${produtoQueries},
    }
`;

export {
    Query
}