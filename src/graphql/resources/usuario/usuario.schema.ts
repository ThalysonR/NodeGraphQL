const usuarioTypes = `
    # User definition type
    type Usuario {
        id_usuario: ID!
        cod_pessoa: Int!
        nome_completo: String!
        nome_fantasia: String!
        tipo_pessoa: String!
        email: String!
        cpf: String!
        cnpj: String!
        
        login: String!
        senha: String!
        
        perfil: Perfil!
    }
    
    type Perfil{
        nome_perfil: String!
    }    
`;

const usuarioQueries = `
    getUsuarios: [Usuario!]
    getPerfilUsuario: Perfil
    checkAuth: Boolean
`;

const usuarioMutations = `
`;

export {
    usuarioTypes,
    usuarioQueries,
    usuarioMutations
}
