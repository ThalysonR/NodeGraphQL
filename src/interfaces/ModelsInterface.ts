import { EnderecoPedidoModel } from '../models/EnderecoPedidoModel';
import { ItensPedidoModel } from '../models/ItensPedidoModel';
import { PagamentoPedidoModel } from '../models/PagamentoPedidoModel';
import { PedidoModel } from '../models/PedidoModel';
import { PerfilModel } from '../models/PerfilModel';
import { UsuarioModel } from '../models/UsuarioModel';
import { ParametroClienteModel } from '../models/ParametroClienteModel';

export interface ModelsInterface {
  Usuario: UsuarioModel;
  Perfil: PerfilModel;
  Pedido: PedidoModel;
  ItensPedido: ItensPedidoModel;
  Endereco: EnderecoPedidoModel;
  Pagamento: PagamentoPedidoModel;
  ParametroCliente: ParametroClienteModel;
}
