import { aplicacoesQueries, aplicacoesTypes, aplicacoesMutations } from './aplicacoes.schema';
import {
  autocompleteQueries,
  autocompleteTypes,
  autocompleteMutations,
} from './autocomplete.schema';
import { produtoQueries, produtoTypes, produtoMutations } from './catalogo.schema';
import { clienteQueries, clienteType, clienteMutations } from './cliente.schema';
import { condicaoQueries, condicaoType, condicaoMutations } from './codicaoPagamento.schema';
import { estoqueQueries, estoqueType, estoqueMutations } from './estoque.schema';
import { pedidoMutations, pedidoQueries, pedidoType } from './pedido.schema';
import { pessoaQueries, pessoaTypes, pessoaMutations } from './pessoa.schema';
import { tokenMutations, tokenTypes } from './token.schema';
import { usuarioQueries, usuarioTypes, usuarioMutations } from './usuario.schema';

const mutations = [
  aplicacoesMutations,
  autocompleteMutations,
  produtoMutations,
  clienteMutations,
  tokenMutations,
  usuarioMutations,
  pessoaMutations,
  estoqueMutations,
  condicaoMutations,
  pedidoMutations,
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
  condicaoType,
  pedidoType,
];

const queries = [
  aplicacoesQueries,
  autocompleteQueries,
  produtoQueries,
  clienteQueries,
  usuarioQueries,
  pessoaQueries,
  estoqueQueries,
  condicaoQueries,
  pedidoQueries,
];

export { mutations, types, queries };
