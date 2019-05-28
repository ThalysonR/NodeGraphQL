import { SQLDataSource } from '../../../models';
import { PedidoAttributes } from '../../../models/PedidoModel';
import { handleError } from './../../../utils/utils';

export default class PedidoService extends SQLDataSource {
  constructor(db?) {
    super(db);
  }

  public async findPedidoByCliente(codcliente: number) {
    const dbFN = this.db.Pedido.findAll.bind(this.db.Pedido);

    return await this.getCached<PedidoAttributes>(dbFN, {
      where: {
        codcliente,
      },
      attributes: ['codpedido'],
      include: [
        {
          model: this.db.ItensPedido,
          as: 'pedidos_itens',
        },
      ],
    }).then(res => {
      const pedido = res.map(pedido => ({
        ...pedido,
        codpedido: pedido.codpedido,
        itens: pedido.pedidos_itens,
      }));

      return pedido;
    });
  }

  public async createOrder(pedido) {
    return await this.db.sequelize
      .transaction(t => {
        return this.db.Pedido.create(pedido, { transaction: t }).then(pedidoSalvo => {
          const itens = pedido.itens.map(res => ({ ...res, codpedido: pedidoSalvo.codpedido }));
          return this.db.ItensPedido.bulkCreate(itens, { transaction: t }).then(pagamento => {
            return this.db.Pagamento.create(
              { ...pedido.pagamento, codpedido: pedidoSalvo.codpedido },
              { transaction: t },
            ).then(endereco => {
              return this.db.Endereco.create(
                { ...pedido.endereco, codpedido: pedidoSalvo.codpedido },
                {
                  transaction: t,
                },
              ).then(() => pedidoSalvo);
            });
          });
        });
      })
      .catch(handleError);
  }
}
