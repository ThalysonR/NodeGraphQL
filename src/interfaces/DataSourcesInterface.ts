import { CatalogoAPI } from '../graphql/datasource';
import { PrecoAPI } from '../graphql/datasource';

export interface DataSources {
    catalogoApi: CatalogoAPI,
    precoApi: PrecoAPI
}