import { pessoaResolvers } from './pessoa.resolvers';
import { catalogoResolvers } from './catalogo.resolvers';
import { tokenResolvers } from './token.resolvers';
import { usuarioResolvers } from './usuario.resolvers';

export default [catalogoResolvers, tokenResolvers, usuarioResolvers, pessoaResolvers];
