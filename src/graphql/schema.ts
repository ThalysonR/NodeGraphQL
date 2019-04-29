import { imagemResolvers } from './resources/imagem/imagem.resolvers';
import { merge } from 'lodash';

import { Query } from './query';
import { Mutation } from './mutation';

import { usuarioResolvers } from './resources/usuario/usuario.resolvers';
import { tokenResolvers } from './resources/auth/token.resolvers';
import { precoResolvers } from './resources/preco/preco.resolvers';
import { geralResolvers } from './resources/geral/geral.resolvers';
import { catalogoResolvers } from './resources/catalogo/catalogo.resolvers';

import { usuarioTypes } from './resources/usuario/usuario.schema';
import { tokenTypes } from './resources/auth/token.schema';
import { produtoTypes } from './resources/catalogo/catalogo.schema';
import { precoTypes } from './resources/preco/preco.schema';
import { clienteType } from './resources/catalogo/cliente.schema';
import { aplicacoesTypes } from './resources/catalogo/aplicacoes.schema';
import { geralTypes } from './resources/geral/geral.schema';
import { similarTypes } from './resources/catalogo/similar.schema';
import { imagemTypes } from './resources/imagem/imagem.schema';
import { autocompleteTypes } from './resources/catalogo/autocomplete.schema';

const resolvers = merge(
  usuarioResolvers,
  tokenResolvers,
  catalogoResolvers,
  precoResolvers,
  geralResolvers,
  imagemResolvers,
);

const typeDefs = [
  Query,
  Mutation,
  usuarioTypes,
  tokenTypes,
  produtoTypes,
  precoTypes,
  clienteType,
  aplicacoesTypes,
  geralTypes,
  similarTypes,
  imagemTypes,
  autocompleteTypes,
];

export { resolvers, typeDefs };
