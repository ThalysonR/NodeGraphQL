import { RESTDataSource } from 'apollo-datasource-rest';

class PessoaApi extends RESTDataSource {
  constructor() {
    super();
    // @ts-ignore
    this.initialize({ context: {} });
    this.baseURL = 'http://192.168.151.89:8000/ws-pessoa/api/';
  }

  public async searchPessoa(text) {
    const params = text.args.text;
    const response = await this.get('pessoa/cpf2/' + params);
    return response;
  }
}

export default PessoaApi;
