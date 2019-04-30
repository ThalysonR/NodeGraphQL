const produtoTypes = `
    type Produto {
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

    type Tags{
        tags: [String]
    }
`;

const produtoQueries = `
    getproduto(text: String!): [Produto!]!
`;

const produtoMutations = `
`;

export { produtoTypes, produtoQueries, produtoMutations };
