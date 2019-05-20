const pedidoType = `

type Pedido{
  codpedido: ID!
  codfilial: Int!
  codfuncionario: Int!
  codcliente: Int!
  condicao: String!
  emissao: String
  situacao: String!
  total: Float!
  observacao: String!
  ordem_compra: String!
}

type ItensPedido{
  codpedido: ID!
  codpedidoitem: Int!
  fornecedor_emp: Int!
  fornecedor_cod: Int!
  produto: String!
  quantidade: Int!
  vl_item: Float!
  vl_total: Float!
  unidade: String!
  embalagem: Int!
  qtd_estoque: Int!
}

type EnderecoPedido{
  codpedend: ID!
  codpedido: Int!
  codendereco: Int!
}

type PagamentoPedido{
  codpedido: Int!
  codpedpagto: ID!
  codtipopagto: Int!
  valor_pago: Float!
  parcela: Int!
  situacao: String!
  cod_adm: Int!
}

input SetPedido{
  codpedido: ID!
  codfilial: Int
  codfuncionario: Int
  codcliente: Int
  condicao: String
  emissao: String
  situacao: String
  total: Float
  observacao: String
  ordem_compra: String
  itens: [SetItensPedido]
  endereco: ID
  pagamento: SetPagamento
}

input SetItensPedido{
  codpedido: ID!
  codpedidoitem: Int
  fornecedor_emp: Int
  fornecedor_cod: Int
  produto: String
  quantidade: Int
  vl_item: Float
  vl_total: Float
  unidade: String
  embalagem: Int
  qtd_estoque: Int
}

input SetPagamento{
  codpedido: Int!
  codpedpagto: ID!
  codtipopagto: Int!
  valor_pago: Float!
  parcela: Int!
  situacao: String!
  cod_adm: Int!
}



`;

const pedidoQueries = `
  searchOrder(codPedido: Int!): Pedido!
`;

const pedidoMutations = `
  createOrder(setPedido: SetPedido!) : Pedido!
`;

export { pedidoType, pedidoQueries, pedidoMutations };
