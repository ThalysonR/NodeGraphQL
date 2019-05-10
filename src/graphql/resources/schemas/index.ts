import { aplicacoesMutations, aplicacoesQueries, aplicacoesTypes } from './aplicacoes.schema';
import {
  autocompleteMutations,
  autocompleteQueries,
  autocompleteTypes,
} from './autocomplete.schema';
import { produtoMutations, produtoQueries, produtoTypes } from './catalogo.schema';
import { clienteMutations, clienteQueries, clienteType } from './cliente.schema';
import { tokenMutations, tokenTypes } from './token.schema';
import { usuarioMutations, usuarioQueries, usuarioTypes } from './usuario.schema';
import { pessoaMutations, pessoaTypes, pessoaQueries } from './pessoa.schema';
import { estoqueQueries, estoqueMutations, estoqueType } from './estoque.schema';

const mutations = [
  aplicacoesMutations,
  autocompleteMutations,
  produtoMutations,
  clienteMutations,
  tokenMutations,
  usuarioMutations,
  pessoaMutations,
  estoqueMutations,
];

const types = [
  aplicacoesTypes,
  autocompleteTypes,
  produtoTypes,
  clienteType,
  tokenTypes,
  usuarioTypes,
  pessoaTypes,
  estoqueType,
];

const queries = [
  aplicacoesQueries,
  autocompleteQueries,
  produtoQueries,
  clienteQueries,
  usuarioQueries,
  pessoaQueries,
  estoqueQueries,
];

export { mutations, types, queries };
