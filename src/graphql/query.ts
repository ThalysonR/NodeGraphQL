import { usuarioQueries } from './resources/usuario/usuario.schema';
import { produtoQueries } from './resources/catalogo/catalogo.schema';
import { precoQueries } from './resources/preco/preco.schema';

const Query = `
    type Query {
        ${usuarioQueries},
        ${produtoQueries},
        ${precoQueries},
    }
`;

export {
    Query
}