const produtoTypes = `
    type Produto {
        id:  ID!
        idEmpresa: Int!
        idFornecedor: Int!
        nomeFornecedor: String!
        codigoProduto: Int!
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
    }
    
    type Models{
        nomeCarro: String!
        modelTipos: [ModelTipos]
    }

    type ModelTipos{
        tipoNome: String
        geracao: String
        motor: String
        anos: [Anos]
        nomeMotor: String
        modeloTransmissao: String
        eixoMotriz: String
    }

    type Anos{
        anos: Int
    }
`;

const produtoMutations = `
    getproduto(text: String!): [Produto!]!
`;

export {
    produtoTypes,
    produtoMutations
}