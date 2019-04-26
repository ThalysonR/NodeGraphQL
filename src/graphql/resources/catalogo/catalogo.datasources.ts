import { RESTDataSource } from 'apollo-datasource-rest';

class CatalogoAPI extends RESTDataSource {
  constructor() {
    super();
    // @ts-ignore
    this.initialize({ context: {} });
    this.baseURL = 'http://192.168.151.89:8000/ws-catalogo/api/';
  }

  public async searchProduto(text) {
    const nomeProduto = text.args.text;

    const response = await this.get(
      'produto?page=0&count=30&order=DESC&sort=frequencia&nomeProduto=' + nomeProduto,
    );

    return Array.isArray(response.produtos.content)
      ? response.produtos.content.map(produto => this.produtoReducer(produto))
      : [];
  }

  public produtoReducer(produto) {
    return {
      id: produto.id || 0,
      idEmpresa: produto.idEmpresa,
      idFornecedor: produto.idFornecedor,
      nomeFornecedor: produto.nomeFornecedor,
      codigoProduto: produto.codigoProduto,
      codigoOriginalProduto: produto.codigoOriginalProduto,
      nomeProduto: produto.nomeProduto,
      frequencia: produto.frequencia,
      codProduto: produto.codProduto,
      score: produto.score,
      tags: produto.tags,
      carType: produto.carType,
      carId: produto.carId,
      articleNo: produto.articleNo,
      manuId: produto.manuId,
      models: produto.models,
      anos: produto.anos,
      modeloCarro: produto.modeloCarro,
      fabricante: produto.fabricante,
      eixo: produto.eixo,
      posicao: produto.posicao,
      lado: produto.lado,
      motor: produto.motor,
      combustivel: produto.combustivel,
      aplicacao: produto.aplicacao,
      montadoras: produto.montadoras,
      prefixo: produto.prefixo,
      aro: produto.aro,
      perfil: produto.perfil,
      viscosidade: produto.viscosidade,
      amperagem: produto.amperagem,
    };
  }

  public async searchAplicacoes(buscaAplicacoes) {
    const aplicacoes = await this.get('produto/aplicacoes', buscaAplicacoes);
    return aplicacoes;
  }

  public async searchSimilar(buscaSimilar) {
    const similar = await this.get('produto/similar', buscaSimilar);
    return similar;
  }

  public async searchCliente(text) {
    const params = text.args.text;
    const response = await this.get('cliente' + '?text=' + params);
    return Array.isArray(response.clientes.content)
      ? response.clientes.content.map(cliente => this.clienteReducer(cliente))
      : [];
  }

  public clienteReducer(cliente) {
    return {
      id: cliente.id || 0,
      nome: cliente.nome,
      municipio: cliente.municipio,
      cnpj: cliente.cnpj,
      cpf: cliente.cpf,
      estado: cliente.estado,
      bairro: cliente.bairro,
      endereco: cliente.endereco,
      cep: cliente.cep,
    };
  }
}

export default CatalogoAPI;
