import { usuarioQueries } from './resources/usuario/usuario.schema'
import { produtoQueries } from './resources/catalogo/catalogo.schema'
import { precoQueries } from './resources/preco/preco.schema'
import { clienteQueries } from './resources/catalogo/cliente.schema'
import { aplicacoesQueries } from './resources/catalogo/aplicacoes.schema'

const Query = `
    type Query {
        ${usuarioQueries},
        ${produtoQueries},
        ${precoQueries},
        ${clienteQueries},
        ${aplicacoesQueries}
    }
`

export { Query }
