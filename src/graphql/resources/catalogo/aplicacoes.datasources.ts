import { RESTDataSource } from 'apollo-datasource-rest';

class AplicacoesApi extends RESTDataSource {
  constructor() {
    super();
    // @ts-ignore
    this.initialize({ context: {} });
    this.baseURL = 'http://192.168.151.89:8000/ws-catalogo/api/';
  }

  public async searchAplicacoes(buscaAplicacoes) {
    const aplicacoes = await this.get('produto/aplicacoes', buscaAplicacoes);
    return aplicacoes;
  }
}

export default AplicacoesApi;
