import { CatalogoAPI, PrecoAPI, ClienteAPI, GeralAPI } from '../graphql/datasource'

export interface DataSources {
  catalogoApi: CatalogoAPI
  precoApi: PrecoAPI
  clienteApi: ClienteAPI
  geralApi: GeralAPI
}
