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
  recnum: Int,
  codigo: String,
  nomeCondicaoPagamento: String,
  descricao: String,
  parcelas: Int,
  periodo: Int,
  periodoEntrada: Int,
  valor: Float,
  documento: String,
  descontoMedio: Float,
  tipoPreco: String,
  parcelaCartao: Int,
  ativo: String,
  caf: String
}
`;

const condicaoQueries = `
  getCondicao(cpfCnpj: String): [CondicaoPagamento]!
  getPagamentoPemaza(codigo: String): PagamentoPemaza!
`;

const condicaoMutations = `
`;

export { condicaoType, condicaoQueries, condicaoMutations };
