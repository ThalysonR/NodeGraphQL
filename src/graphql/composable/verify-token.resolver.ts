import * as jwt from 'jsonwebtoken';
import {GraphQLFieldResolver} from "graphql";

import {ResolverContext} from "../../interfaces/ResolverContextInterface";
import {JWT_TOKEN_SECRET} from '../../utils/utils';
import {UNAUTHORIZED} from '../../environment';

export const verifyTokenResolver =
    (resolver: GraphQLFieldResolver<any, ResolverContext>): GraphQLFieldResolver<any, ResolverContext> => {

        return (parent, args, context: ResolverContext, info) => {

            if (context.authorization) {
                const token: string = context.authorization.split(' ')[1];
                return jwt.verify(token, JWT_TOKEN_SECRET, (err, decoded: any) => {
                    if (!err) {
                        return resolver(parent, args, context, info);
                    }

                    throw new Error(UNAUTHORIZED);
                });
            }
            throw new Error(UNAUTHORIZED);
        };
    };