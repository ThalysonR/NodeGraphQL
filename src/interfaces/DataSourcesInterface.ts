import {AplicacoesAPI, CatalogoAPI, ClienteAPI, GeralAPI, PrecoAPI, SimilarApi} from '../graphql/datasource';

export interface DataSources {
  catalogoApi: CatalogoAPI;
  precoApi: PrecoAPI;
  clienteApi: ClienteAPI;
  aplicacoesApi: AplicacoesAPI;
  geralApi: GeralAPI;
  similarApi: SimilarApi;
}
