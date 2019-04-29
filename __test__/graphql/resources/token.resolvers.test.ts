import { tokenResolvers } from '../../../src/graphql/resources/auth/token.resolvers';
import SequelizeMock from 'sequelize-mock';

describe('Test token resolvers', () => {
    const dbMock = new SequelizeMock();
    const defaultUserPF= {
        id_usuario: 1,
        nome_usuario: 'thalyson',
        login: '33517308293',
        email: 'teste@teste.com',
        senha: '123456',
        perfis: [{ nome_perfil: 'Teste' }]
    };
    const UserMockPF = dbMock.define('Usuario', defaultUserPF, {
        instanceMethods: {
            isPassword: () => true
        }
    });

    UserMockPF.$queryInterface.$useHandler((query, queryOptions, done) => {
        if (query === 'findOne') {
            return queryOptions[0].where.login === '33517308293' ? UserMockPF.build(defaultUserPF) : null;
        }
        return null;
    });

    const defaultUserPJ = {
        id_usuario: 1,
        nome_usuario: 'thalyson',
        login: '13484296000105',
        email: 'teste@teste.com',
        senha: '123456',
        perfis: [{ nome_perfil: 'Teste' }]
    };
    const UserMockPJ = dbMock.define('Usuario', defaultUserPJ, {
        instanceMethods: {
            isPassword: () => true
        }
    });

    UserMockPJ.$queryInterface.$useHandler((query, queryOptions, done) => {
        if (query === 'findOne') {
            return queryOptions[0].where.login === '13484296000105' ? UserMockPJ.build(defaultUserPJ) : null;
        }
        return null;
    });

    it('Should throw when no user found', async () => {
        // @ts-ignore
        await expect(tokenResolvers.Mutation.createToken(null, { login: 'login', senha: 'senha' }, { db: { Usuario: UserMockPF } })).rejects.toBeDefined();
    });

    it('Should throw when credentials empty', async () => {
        // @ts-ignore
        const user = tokenResolvers.Mutation.createToken(null, { login: '', senha: '' }, { db: { Usuario: UserMockPF } });
        await expect(user).rejects.toBeDefined();
        await expect(user).not.toHaveProperty('token');
    });

    it('Should throw when pessoa fisica does not exist', async () => {
        // @ts-ignore
        const user = tokenResolvers.Mutation.createToken(null, { login: '12345678910', senha: 'senha' }, { db: { Usuario: UserMockPF } });
        await expect(user).rejects.toBeDefined();
        await expect(user).not.toHaveProperty('token');
    });

    it('Should throw when pessoa juridica does not exist', async () => {
        // @ts-ignore
        const user = tokenResolvers.Mutation.createToken(null, { login: '12345678911234', senha: 'senha' }, { db: { Usuario: UserMockPF } });
        await expect(user).rejects.toBeDefined();
        await expect(user).not.toHaveProperty('token');
    });


    it('Should return token when user is correct', async () => {
        // @ts-ignore
        const user = await tokenResolvers.Mutation.createToken(null, { login: '33517308293', senha: 'senha' }, { db: { Usuario: UserMockPF } });
        expect(user).toHaveProperty('token');
    });


    it('Should return token when user PF is correct', async () => {
        // @ts-ignore
        const user = await tokenResolvers.Mutation.createToken(null, { login: '33517308293', senha: 'senha' }, { db: { Usuario: UserMockPF } });
        expect(user).toHaveProperty('token');
    });

    it('Should return token when user PJ is correct', async () => {
        // @ts-ignore
        const user = await tokenResolvers.Mutation.createToken(null, { login: '13484296000105', senha: '123' }, { db: { Usuario: UserMockPJ } });
        expect(user).toHaveProperty('token');
    });
});
