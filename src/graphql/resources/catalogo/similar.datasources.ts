import { RESTDataSource } from 'apollo-datasource-rest';

class SimilarApi extends RESTDataSource {
  constructor() {
    super();
    // @ts-ignore
    this.initialize({ context: {} });
    this.baseURL = 'http://192.168.151.89:8000/ws-catalogo/api/';
  }

  public async searchSimilar(buscaSimilar) {
    const similar = await this.get('produto/similar', buscaSimilar);
    return similar;
  }
}

export default SimilarApi;
