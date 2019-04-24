import { CatalogoAPI, PrecoAPI, ClienteAPI, GeralAPI, AplicacoesAPI } from '../graphql/datasource'

export interface DataSources {
  catalogoApi: CatalogoAPI
  precoApi: PrecoAPI
  clienteApi: ClienteAPI
  aplicacoesApi: AplicacoesAPI
  geralApi: GeralAPI
}
