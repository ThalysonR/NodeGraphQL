import { SQLDataSource } from '../../../models';

export default class PedidoService extends SQLDataSource {
  public async findPedidoByCliente(codcliente: number) {
    return await PedidoService.db.Pedido.findAll({
      where: {
        codcliente,
      },
    });
  }
}
