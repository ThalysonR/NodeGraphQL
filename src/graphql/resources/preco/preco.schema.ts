const precoTypes = `
    type ProdutoPreco {
    filial: Int!,
    fornecedorCodigo: Int!,
    empresa: Int!,
    descricaoProduto: String!,
    fornecedorNome: String!,
    qtdEstoque: Int!,
    produto: String!,
    minimo: Int!,
    maximo: Int!,
    ativo: String!,
    endereco: String!,
    unidade: [UnidadePreco]!
    }

    type UnidadePreco {
        tipo: String!,
        preco: Float!,
        qtd: Int!
    }

    input BuscaProduto {
    condicao: String!,
    descontoItem: Int!,
    fatorAumento: Int!,
    filial: Int!,
    fornecedorCodigo: Int!,
    fornecedorEmpresa: Int!,
    produto: String!,
    tipoPreco: String!,
    unidadeVenda: String!
    }
`;

const precoQueries = `
    getPrecos(buscaProdutos: [BuscaProduto]): [ProdutoPreco]!
`;

const precoMutations = `
`;

export { precoTypes, precoQueries, precoMutations };