import { usuarioResolvers } from '../../../src/graphql/resources/usuario/usuario.resolvers';
import SequelizeMock from 'sequelize-mock';
import { JWT_TOKEN_SECRET } from '../../../src/utils/utils';
import * as jwt from 'jsonwebtoken';

describe('Test usuario resolvers', () => {
    const dbMock = new SequelizeMock();
    const secret = `Bearer: ${jwt.sign('123456', JWT_TOKEN_SECRET)}`;
    const UserMock = dbMock.define('Usuario', {
        id_usuario: 1,
        nome_usuario: 'thalyson',
        login: 'thalyson',
        email: 'teste@teste.com',
        senha: 123456
    });

    it('Should return all users', async () => {
        // @ts-ignore
        const usuarios = await usuarioResolvers.Query.getUsuarios(null, [], { db: { Usuario: UserMock }, authorization: secret }, null);
        expect(usuarios[0]['nome_usuario']).toBe('thalyson');
    });

    it('Should return check auth', async () => {
        // @ts-ignore
        const usuario = await usuarioResolvers.Query.checkAuth(null, [], { authUser: { id: 1 }, authorization: secret }, null);
        expect(usuario).toBe(true);
    });
});
