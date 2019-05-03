import { RESTDataSource } from 'apollo-datasource-rest';

class PessoaApi extends RESTDataSource {
  constructor() {
    super();
    // @ts-ignore
    this.initialize({ context: {} });
    this.baseURL = 'http://192.168.151.89:8000/ws-pessoa/api/';
  }

  public async searchPessoa(text) {
    const params = text;
    const response = await this.get('pessoa/cpf2/' + params);
    return this.pessoaReducerFisica(response);
  }

  public async searchPessoaJuridica(text) {
    const params = text;
    const response = await this.get('pessoa/cnpj/' + params);
    return this.pessoaReducerJuridica(response);
  }

  public async buscaConsumidorFinal() {
    return await this.get('pessoa/buscaConsumidorFinal');
  }

  private pessoaReducerFisica(pessoa) {
    return {
      nomeCompleto: pessoa.nomeCompleto,
      nomeFantasia: pessoa.nomeFantasia,
      tipoPessoa: pessoa.tipoPessoa,
      dataCadastro: pessoa.dataCadastro,
      tipoCadastro: pessoa.tipoCadastro,
      emails: pessoa.emails,
      enderecos: pessoa.enderecos,
      telefones: pessoa.telefones,
      pessoaCadastro: pessoa.pessoaFisica,
      clientes: pessoa.clientes,
    };
  }

  private pessoaReducerJuridica(pessoa) {
    return {
      nomeCompleto: pessoa.nomeCompleto,
      nomeFantasia: pessoa.nomeFantasia,
      tipoPessoa: pessoa.tipoPessoa,
      dataCadastro: pessoa.dataCadastro,
      tipoCadastro: pessoa.tipoCadastro,
      emails: pessoa.emails,
      enderecos: pessoa.enderecos,
      telefones: pessoa.telefones,
      pessoaCadastro: pessoa.pessoaJuridica,
      clientes: pessoa.clientes,
    };
  }
}

export default PessoaApi;
