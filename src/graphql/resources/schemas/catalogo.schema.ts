const produtoTypes = `
type Data{
    produtos: Produtos!
    tags: [String]!
}

type Produtos{
    content: [Content]!
    pageable: Pageable
    facets: [String]
    aggregations: Aggregations
    scrollId: String
    totalPages: Int
    totalElements: Int
    sort: Sort
    first: Boolean
    last: Boolean
    numberOfElements: Int
    size: Int
    number: Int
}

type Content {
    id:  ID!
    idEmpresa: Int!
    idFornecedor: Int!
    nomeFornecedor: String!
    codigoProduto: String!
    codigoOriginalProduto: Int
    nomeProduto: String!
    frequencia: Int!
    codProduto: String!
    score: Int
    tags: String
    carType: String
    carId: Int
    articleNo: Int
    manuId: Int
    models: [Models!]!
    modeloCarro: String
    fabricante: String
    anos: [String]
    eixo: [String]
    posicao: [String]
    lado: [String]
    motor: [String]
    combustivel: [String]
    aplicacao: [String]
    montadoras: [String]
    prefixo: String
    aro: String
    perfil: String
    viscosidade: String
    amperagem: String
}

type Models{
    nomeCarro: String!
    modelTipos: [ModelTipos]
}

type ModelTipos{
    tipoNome: String
    geracao: String
    motor: String
    anos: [String]
    nomeMotor: String
    modeloTransmissao: String
    eixoMotriz: String
}

type Pageable{
    sort: Sort
    pageSize: Int
    pageNumber: Int
    offset: Int
    unpaged: Boolean
    paged: Boolean
}

type Sort{
    unsorted: Boolean
    sorted: Boolean
}

type Aggregations{
    fragment: Boolean
    asMap: AsMap
}

type AsMap{
    asMap: String
}

input PesqProduto{
    page: Int!
    count: Int!
    order: String!
    sort: String!
    nomeProduto: String!
}
`;

const produtoQueries = `
    getproduto(pesqProduto: PesqProduto!): Data!
`;

const produtoMutations = `
`;

export { produtoTypes, produtoQueries, produtoMutations };
