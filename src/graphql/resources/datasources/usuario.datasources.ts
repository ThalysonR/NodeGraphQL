import {SQLDataSource} from '../../../models';
import {UsuarioAttributes} from '../../../models/UsuarioModel';
import {ParametroClienteAttributes} from '../../../models/ParametroClienteModel';

export default class UsuarioService extends SQLDataSource {
  constructor(db?) {
    super(db);
  }

  public async findUserByLogin(login) {
    const dbFn = this.db.Usuario.findOne.bind(this.db.Usuario);
    return await this.getCached<UsuarioAttributes>(dbFn, {
      where: {login},
      attributes: ['id_usuario', 'senha', 'login', 'email', 'status_usuario'],
      include: [
        {
          model: this.db.Perfil,
          through: {
            attributes: ['nome_perfil'],
          },
          as: 'perfis',
        },
      ],
    });
  }

  public async findAll() {
    const dbFn = this.db.Usuario.findAll.bind(this.db.Usuario);
    return await this.getCached<UsuarioAttributes>(dbFn, {});
  }

  public async getParametroUserByCodCliente(codcliente) {
    return await this.db.ParametroCliente.findOne<ParametroClienteAttributes>({
      where: {codcliente},
      attributes: ['codcliente', 'codfilial']
    });
  }
}
