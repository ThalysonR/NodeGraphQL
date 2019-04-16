import express = require('express');
import {resolvers, typeDefs} from './graphql/schema';
import db from './models';
import * as jwt from "jsonwebtoken";
import {JWT_SECRET} from "./utils/utils";

const {ApolloServer} = require('apollo-server-express');

class App {

    public app: express.Application;
    public apollo: any;

    constructor() {
        this.app = express();
        this.init();
    }

    private init(): void {
        this.middleware();
    }

    private middleware(): void {
        this.apollo = new ApolloServer({
            typeDefs, resolvers, context: ({req} : any) => {

                const authorization: string = req.headers.authorization as string;
                const token: string = authorization ? authorization.split(' ')[1] : '';

                if (!token) {
                    return {
                        authorization,
                        db
                    };
                }

                jwt.verify(token, JWT_SECRET, (err: any, decoded: any): any => {
                    if (err) {
                        return {
                            authorization,
                            db
                        };
                    }

                    db.Usuario.findById(decoded.sub, {
                        attributes: ['id_usuario', 'login']
                    }).then((user: any): any => {
                        if (user) {
                            return {
                                authorization,
                                db,
                                authUser: {
                                    id: user.get('id_usuario'),
                                    login: user.get('login')
                                }
                            };
                        }
                    });
                });
                return {
                    authorization,
                    db
                };
            }
        });

        const app = this.app;
        this.apollo.applyMiddleware({app});
    }
}

export default new App().app;