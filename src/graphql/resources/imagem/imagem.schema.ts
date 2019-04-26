const imagemTypes = `
type Imagem{
    CodFornecedor: String!
    CodProduto: String!
    ImgBase64: String!
}
`;

const imagemQueries = `
    getImagem(CodFornecedor: String!, CodProduto: String!): [Imagem]!
`;

const imagemMutations = `
`;
export { imagemTypes, imagemQueries, imagemMutations };
