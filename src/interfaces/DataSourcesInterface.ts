import { CatalogoAPI, GeralAPI, PrecoAPI, ImagemApi } from '../graphql/datasource';

export interface DataSources {
  catalogoApi: CatalogoAPI;
  precoApi: PrecoAPI;
  geralApi: GeralAPI;
  imagemApi: ImagemApi;
}
