import { GraphQLFieldResolver } from "graphql";

export type ComposableResolver<TSource, TContext> =
    (fn: GraphQLFieldResolver<TSource, TContext>) => GraphQLFieldResolver<TSource, TContext>;

export const compose = <TSource, TContext>(...funcs: Array<ComposableResolver<TSource, TContext>>)
    : ComposableResolver<TSource, TContext> => (f: GraphQLFieldResolver<TSource, TContext>) => funcs.reduceRight((prev, fn) => fn(prev), f);