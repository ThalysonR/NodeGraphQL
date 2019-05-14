const condicaoType = `
type CondicaoPagamento {
    recnum: Int
    codigo: String
    nomeCondicaoPagamento: String
    descricao: String
    parcelas: Int
    periodo: Int
    periodoEntrada: Int
    descontoMedio: Float
    documento: String
}

input BuscaCondicao {
  operacao: Int
  tipoPreco: String!
  formaPagamento: String!
  prazoMedio: Int!
}
`;

const condicaoQueries = `
  getCondicao(buscaCondicao: BuscaCondicao!): [CondicaoPagamento]!
`;

const condicaoMutations = `
`;

export { condicaoType, condicaoQueries, condicaoMutations };
