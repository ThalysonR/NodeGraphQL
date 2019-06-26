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

type PagamentoPemaza{
  recnum: Int
  codigo: String
  nomeCondicaoPagamento: String
  descricao: String
  parcelas: Int
  periodo: Int
  periodoEntrada: Int
  valor: Float
  documento: String
  descontoMedio: Float
  tipoPreco: String
  parcelaCartao: Int
  ativo: String
  caf: String
}

type TipoPagamento{
  recnum: Int
  codigo: String
  codigo1: Int
  descricao: String
  descricao1: String
  obs: String
  de_est_contrib: String
  de_est_ncontrib: String
  fo_est_contrib: String
  fo_est_ncontrib: String
  caf: String
}
`;

const condicaoQueries = `
  getCondicao(cpfCnpj: String): [CondicaoPagamento]!
  getPagamentoPemaza(codigo: String): PagamentoPemaza!
  getTipoPagamento(codigo: String): TipoPagamento!

`;

const condicaoMutations = `
`;

export { condicaoType, condicaoQueries, condicaoMutations };
