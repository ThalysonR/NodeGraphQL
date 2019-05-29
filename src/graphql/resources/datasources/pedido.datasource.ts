import { SQLDataSource } from '../../../models';

export default class PedidoService extends SQLDataSource {
  constructor(db?) {
    super(db);
  }

  public async findPedidoByCliente(codcliente: number) {
    return await this.db.Pedido.findAll({
      where: {
        codcliente,
      },
    });
    // const dbFN = this.db.Pedido.findAll.bind(this.db.Pedido);
    // return await this.getCached<PedidoAttributes>(dbFN, {
    //   where: {
    //     codcliente,
    //   },
    // });
  }

  public createOrder(pedido) {
    this.db.Pedido.create({ ...pedido });
    return pedido;
  }
}
