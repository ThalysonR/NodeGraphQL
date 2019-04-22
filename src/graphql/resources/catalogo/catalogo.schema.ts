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
        nomeMotor: String
        modeloTransmissao: String
        eixoMotriz: String
    }

    type ModelTipos{
        tipoNome: Int
        geracao: String
        motor: Int
        anos: [Anos]
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