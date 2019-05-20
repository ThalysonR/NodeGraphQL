import { SQLDataSource } from '../../../models';
import { UsuarioAttributes } from '../../../models/UsuarioModel';

export default class UsuarioService extends SQLDataSource {
  constructor(db?) {
    super(db);
  }

  public async findUserByLogin(login) {
    console.log('FindUser: ', UsuarioService.db);
    const dbFn = UsuarioService.db.Usuario.findOne.bind(UsuarioService.db.Usuario);
    console.log('FindUser: ', dbFn({ where: { login } }));
    return await this.getCached<UsuarioAttributes>(dbFn, {
      where: { login },
      attributes: ['id_usuario', 'senha', 'login', 'email', 'status_usuario'],
      include: [
        {
          model: UsuarioService.db.Perfil,
          through: {
            attributes: ['nome_perfil'],
          },
          as: 'perfis',
        },
      ],
    });
  }

  public async findAll() {
    const dbFn = UsuarioService.db.Usuario.findAll.bind(UsuarioService.db.Usuario);
    return await this.getCached<UsuarioAttributes>(dbFn, {});
  }
}
