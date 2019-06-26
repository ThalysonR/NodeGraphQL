import { SQLDataSource } from '../../../models';
import { PedidoAttributes } from './../../../models/PedidoModel';
import { handleError } from './../../../utils/utils';

export default class PedidoService extends SQLDataSource {
  constructor(db?) {
    super(db);
  }

  public async findPedidoByCliente(buscaPedido) {
    return await this.db.Pedido.findAll<PedidoAttributes>({
      where: buscaPedido,
      order: [['codpedido', 'DESC']],
      attributes: [
        'codpedido',
        'situacao',
        'total',
        'condicao',
        'observacao',
        'ordem_compra',
        'codcliente',
        'total',
      ],
      include: [
        {
          model: this.db.ItensPedido,
          as: 'pedidos_itens',
        },
      ],
    })
      .then(res => {
        return res.map(value => {
          if (value.situacao === 'S') {
            value.situacao = 'SOLICITADO';
          } else if (value.situacao === 'A') {
            value.situacao = 'EM ANDAMENTO';
          } else if (value.situacao === 'E') {
            value.situacao = 'ENTREGUE';
          }

          const pedido = value.get({ plain: true });

          return {
            ...pedido,
            codpedido: pedido.codpedido,
            total: pedido.total,
            situacao: pedido.situacao,
            observacao: pedido.observacao,
            qtdItens: value.pedidos_itens.length,
            itens: value.pedidos_itens,
          };
        });
      })
      .catch(handleError);
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
