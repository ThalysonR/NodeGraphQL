const usuarioTypes = `

    # User definition type
    type Usuario {
        id_usuario: ID!
        nome_usuario: String!
        login: String!
        email: String!
        senha: String!
    }
`;

const usuarioQueries = `
    getUsuarios: [Usuario!]
`;

const usuarioMutations = `
`;

export {
    usuarioTypes,
    usuarioQueries,
    usuarioMutations
}