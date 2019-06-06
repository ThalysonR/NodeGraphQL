import { SQLDataSource } from '../../../models';
import { PedidoAttributes } from './../../../models/PedidoModel';
import { handleError } from './../../../utils/utils';

export default class PedidoService extends SQLDataSource {
  constructor(db?) {
    super(db);
  }

  public async findPedidoByCliente(codcliente: number) {
    return await this.db.Pedido.findAll<PedidoAttributes>({
      where: {
        codcliente,
      },
      order: [['codpedido', 'DESC']],
      attributes: ['codpedido', 'situacao', 'total', 'condicao', 'observacao', 'ordem_compra'],
      include: [
        {
          model: this.db.ItensPedido,
          as: 'pedidos_itens',
        },
      ],
    }).then(res => {
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
          codpedido: value.codpedido,
          total: value.total,
          situacao: value.situacao,
          qtdItens: value.pedidos_itens.length,
          itens: value.pedidos_itens,
        };
      });
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
