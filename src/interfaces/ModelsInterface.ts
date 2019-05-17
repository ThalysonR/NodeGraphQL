import { UsuarioModel } from '../models/UsuarioModel';
import { PerfilModel } from '../models/PerfilModel';
import { PedidoModel } from '../models/PedidoModel';
import { EnderecoPedidoModel } from '../models/EnderecoPedidoModel';
import { ItensPedidoModel } from '../models/ItensPedidoModel';
import { PagamentoPedidoModel } from '../models/PagamentoPedidoModel';

export interface ModelsInterface {
  Usuario: UsuarioModel;
  Perfil: PerfilModel;
  Pedido: PedidoModel;
  ItensPedido: ItensPedidoModel;
  Endereco: EnderecoPedidoModel;
  Pagamento: PagamentoPedidoModel;
}
