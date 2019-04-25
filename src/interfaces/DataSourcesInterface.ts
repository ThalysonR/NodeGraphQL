import {
  CatalogoAPI,
  PrecoAPI,
  ClienteAPI,
  GeralAPI,
  AplicacoesAPI,
  SimilarApi,
} from '../graphql/datasource';

export interface DataSources {
  catalogoApi: CatalogoAPI;
  precoApi: PrecoAPI;
  clienteApi: ClienteAPI;
  aplicacoesApi: AplicacoesAPI;
  geralApi: GeralAPI;
  similarApi: SimilarApi;
}
