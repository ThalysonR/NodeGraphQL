import { usuarioQueries } from './resources/usuario/usuario.schema';
import { produtoQueries } from './resources/catalogo/catalogo.schema';
import { precoQueries } from './resources/preco/preco.schema';
import { clienteQueries } from './resources/catalogo/cliente.schema';
import { aplicacoesQueries } from './resources/catalogo/aplicacoes.schema';
import { geralQueries } from './resources/geral/geral.schema';
import { similarQueries } from './resources/catalogo/similar.schema';

const Query = `
    type Query {
        ${usuarioQueries},
        ${produtoQueries},
        ${precoQueries},
        ${aplicacoesQueries}
        ${clienteQueries},
        ${geralQueries},
        ${similarQueries}
    }
`;

export { Query };
