import { tokenResolvers } from '../../../src/graphql/resources/auth/token.resolvers';
import SequelizeMock from 'sequelize-mock';

describe('Test token resolvers', () => {
    const dbMock = new SequelizeMock();
    const defaultUser = {
        id_usuario: 1,
        nome_usuario: 'thalyson',
        login: '33517308293',
        email: 'teste@teste.com',
        senha: '123456',
        perfis: [{ nome_perfil: 'Teste' }]
    };
    const UserMock = dbMock.define('Usuario', defaultUser, {
        instanceMethods: {
            isPassword: () => true
        }
    });
    UserMock.$queryInterface.$useHandler((query, queryOptions, done) => {
        if (query === 'findOne') {
            return queryOptions[0].where.login === '33517308293' ? UserMock.build(defaultUser) : null;
        }
        return null;
    });

    it('Should throw when no user found', async () => {
        // @ts-ignore
        await expect(tokenResolvers.Mutation.createToken(null, { login: 'login', senha: 'senha' }, { db: { Usuario: UserMock } })).rejects.toBeDefined();
    });

    it('Should throw when credentials empty', async () => {
        // @ts-ignore
        const user = tokenResolvers.Mutation.createToken(null, { login: '', senha: '' }, { db: { Usuario: UserMock } });
        await expect(user).rejects.toBeDefined();
        await expect(user).not.toHaveProperty('token');
    });

    it('Should throw when pessoa fisica does not exist', async () => {
        // @ts-ignore
        const user = tokenResolvers.Mutation.createToken(null, { login: '12345678910', senha: 'senha' }, { db: { Usuario: UserMock } });
        await expect(user).rejects.toBeDefined();
        await expect(user).not.toHaveProperty('token');
    });

    it('Should throw when pessoa juridica does not exist', async () => {
        // @ts-ignore
        const user = tokenResolvers.Mutation.createToken(null, { login: '12345678911234', senha: 'senha' }, { db: { Usuario: UserMock } });
        await expect(user).rejects.toBeDefined();
        await expect(user).not.toHaveProperty('token');
    });


    it('Should return token when user is correct', async () => {
        // @ts-ignore
        const user = await tokenResolvers.Mutation.createToken(null, { login: '33517308293', senha: 'senha' }, { db: { Usuario: UserMock } });
        expect(user).toHaveProperty('token');
    });



    it('Should return empty perfil if perfil is null', async () => {
        const UserMock2 = dbMock.define('Usuario', { ...defaultUser, perfis: [] }, {
            instanceMethods: {
                isPassword: () => true
            }
        });
        // @ts-ignore
        const user = await tokenResolvers.Mutation.createToken(null, { login: '33517308293', senha: 'senha' }, { db: { Usuario: UserMock2 } });
        expect(user.usuario.perfil.nome_perfil).toBe('');
    });
});
