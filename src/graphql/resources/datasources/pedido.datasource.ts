import { SQLDataSource } from '../../../models';

export default class PedidoService extends SQLDataSource {
  public async findPedidoByCliente(codcliente: number) {
    const dbFN = PedidoService.db.Pedido.findAll.bind(PedidoService.db.Pedido);
    return await this.getCached(dbFN, {
      where: {
        codcliente,
      },
    });
  }
}
