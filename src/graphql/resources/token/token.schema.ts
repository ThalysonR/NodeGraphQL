const tokenTypes = `
    type Token {
        token: String!
    }
`;

const tokenMutations = `
    createToken(login: String!, senha: String!): Token
`;

export {
    tokenTypes,
    tokenMutations
}