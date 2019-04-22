import {merge} from 'lodash';

import {Query} from './query';
import {Mutation} from './mutation';

import {usuarioTypes} from './resources/usuario/usuario.schema';
import {usuarioResolvers} from './resources/usuario/usuario.resolvers';
import {tokenResolvers} from "./resources/token/token.resolvers";
import {tokenTypes} from "./resources/token/token.schema";
import { catalogoResolvers } from './resources/catalogo/catalogo.resolvers'
import { produtoTypes } from './resources/catalogo/catalogo.schema'

const resolvers = merge(
    usuarioResolvers,
    tokenResolvers,
    catalogoResolvers
);

const typeDefs = [
    Query,
    Mutation,
    usuarioTypes,
    tokenTypes,
    produtoTypes
];

export {resolvers, typeDefs};
