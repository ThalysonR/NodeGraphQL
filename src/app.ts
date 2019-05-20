const { ApolloServer } = require('apollo-server');
import { resolvers, typeDefs } from './graphql/schema';
import db from './models';

import { DataSources } from './interfaces/DataSourcesInterface';
import * as dataSources from './graphql/resources/datasources';

import * as jwt from 'jsonwebtoken';
import { JWT_TOKEN_SECRET } from './utils/utils';
import { JWT } from './environment';
import { formatError } from './graphql/response';
import { refreshTokens } from './authentication/handleTokens';
import getConfig from './environment/datasources.config';

class App {
  public apollo: any;

  constructor() {
    this.init();
  }

  private init(): void {
    this.middleware();
  }

  private middleware(): void {
    const dtSourceConfig = getConfig();

    this.apollo = new ApolloServer({
      typeDefs,
      resolvers,
      dataSources: (): DataSources => ({
        catalogoApi: new dataSources.CatalogoAPI(dtSourceConfig),
        precoApi: new dataSources.PrecoAPI(dtSourceConfig),
        geralApi: new dataSources.GeralAPI(dtSourceConfig),
        imagemApi: new dataSources.ImagemAPI(dtSourceConfig),
        pessoaApi: new dataSources.PessoaApi(dtSourceConfig),
        pedidoService: new dataSources.PedidoService(),
        usuarioService: new dataSources.UsuarioService(),
      }),
      formatError: err => formatError(err),
      context: async ({ req, res }: any) => {
        const authorization: string | null = req.headers[JWT.HEADER.TOKEN.NAME] as string;
        const token: string = authorization ? authorization.split(' ')[1] : '';

        const rToken: string | null = req.headers[JWT.HEADER.REFRESH_TOKEN.NAME] as string;
        const refreshToken: string = rToken ? rToken.split(' ')[1] : '';

        if (token) {
          try {
            const { sub }: any = jwt.verify(token, JWT_TOKEN_SECRET);

            return {
              authorization,
              refreshToken,
              db,
              authUser: {
                id: sub,
              },
            };
          } catch (err) {
            if (refreshToken) {
              const {
                token: newToken,
                refreshToken: newRefreshToken,
                id,
              }: any = await refreshTokens(refreshToken);

              res.set('Access-Control-Expose-Headers', '*');
              res.set(JWT.HEADER.TOKEN.NAME, newToken);
              res.set(JWT.HEADER.REFRESH_TOKEN.NAME, newRefreshToken);

              return {
                authorization: `Bearer ${newToken}`,
                refreshToken,
                db,
                authUser: {
                  id,
                },
              };
            }
          }
        }
        return {
          db,
        };
      },
    });
  }
}

export default new App().apollo;
