import { RESTDataSource } from 'apollo-datasource-rest';

class GeralAPI extends RESTDataSource {
  constructor(config) {
    super();
    this.baseURL = `${config.microServicesUrl}/ws-geral/api/`;
  }

  public async findSaldoClienteByCpfCnpj(cpfCnpj: string) {
    const saldoCliente = await this.get('/clientePemaza/saldoCliente/cpfCnpj', { cpfCnpj });
    return saldoCliente[0];
  }

  public async searchEstoque(buscaEstoque) {
    const estoque = await this.get('/estoquePemaza/produtoEstoquePorFiliais', buscaEstoque);
    return estoque;
  }

  public async searchCondicao(buscaCondicao) {
    const condicao = await this.get(
      '/condicaoPagamentoPemaza/buscaCondicaoPagamento',
      buscaCondicao,
    );
    return condicao;
  }

  public async searchPagamento(codigo) {
    const pagamento = await this.get('/condicaoPagamentoPemaza/codigo', codigo);
    return pagamento;
  }

  public async searchTipoPagamento(codigo) {
    const tipopagamento = await this.get('/tipoPagamentoPemaza/formaPagamento', codigo);
    return tipopagamento;
  }

  public async searchFilial(codigo) {
    const estado = await this.get('/filialPemaza/filial', codigo);
    return estado;
  }
}

export default GeralAPI;
