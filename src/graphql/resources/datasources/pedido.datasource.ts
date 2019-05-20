import { SQLDataSource } from '../../../models';
import { PedidoAttributes } from '../../../models/PedidoModel';

export default class PedidoService extends SQLDataSource {
  public async findPedidoByCliente(codcliente: number) {
    const dbFN = PedidoService.db.Pedido.findAll.bind(PedidoService.db.Pedido);
    return await this.getCached<PedidoAttributes>(dbFN, {
      where: {
        codcliente,
      },
    });
  }

  public createOrder(pedido) {
    PedidoService.db.Pedido.create({ ...pedido });
    return pedido;
  }
}
