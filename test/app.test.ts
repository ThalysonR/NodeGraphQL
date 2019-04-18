import {ApolloServerBase, gql} from 'apollo-server-core';
import createTestClient from "./createTestClient";
import database from './../src/models';
import {resolvers, typeDefs as typeDefsSchema} from "../src/graphql/schema";

describe("Authentication", () => {
    const typeDefs = gql(`
        ${typeDefsSchema.toString()}
    `);

    const myTestServer = new ApolloServerBase({
        typeDefs,
        context: () => ({db: database}),
        resolvers
    });

    it('shold return jwt token when valid credentials', async () => {
        const query = gql`
            mutation{
                createToken(login: "mario", senha: "123"){
                    token
                }
            }
        `;
        const client = createTestClient(myTestServer);
        const clientRes = await client.mutate({query});

        expect(clientRes.data).toHaveProperty("createToken.token");
        expect(clientRes.errors).toBeUndefined();
    });


    it('shold return null with errors token when invalid credentials', async () => {
        const query = gql`
            mutation{
                createToken(login: "mario", senha: "1234"){
                    token
                }
            }
        `;
        const client = createTestClient(myTestServer);
        const clientRes = await client.mutate({query});

        // @ts-ignore
        expect(clientRes.data.createToken).toBeNull();
        expect(clientRes.errors).not.toBeUndefined();
    });

    // it('allows queries', async () => {
    //     const query = `{ test(echo: "foo") }`;
    //     const client = createTestClient(myTestServer);
    //     const res = await client.query({query});
    //     expect(res.data).toEqual({test: 'foo'});
    // });
    //
    // it('allows mutations', async () => {
    //     const mutation = `mutation increment { increment }`;
    //     const client = createTestClient(myTestServer);
    //     const res = await client.mutate({mutation});
    //     expect(res.data).toEqual({increment: 1});
    // });
    //
    // it('allows variables to be passed', async () => {
    //     const query = `query test($echo: String){ test(echo: $echo) }`;
    //     const client = createTestClient(myTestServer);
    //     // @ts-ignore
    //     const res = await client.query({query, variables: {echo: 'wow'}});
    //     expect(res.data).toEqual({test: 'wow'});
    // });
    //
    // it('resolves with context', async () => {
    //     const query = `{ hello }`;
    //     const client = createTestClient(myTestServer);
    //     const res = await client.query({query});
    //     expect(res.data).toEqual({hello: 'hello tom'});
    // });
    //
    // it('allows query documents as input', async () => {
    //     const query = gql`
    //         {
    //             test(echo: "foo")
    //         }
    //     `;
    //     const client = createTestClient(myTestServer);
    //     const clientRes = await client.query({query});
    //     expect(clientRes.data).toEqual({test: 'foo'});
    //
    //     const mutation = gql`
    //         mutation increment {
    //             increment
    //         }
    //     `;
    //     const mutationRes = await client.mutate({mutation});
    //     expect(mutationRes.data).toEqual({increment: 1});
    // });

});