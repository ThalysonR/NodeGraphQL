import { ApolloError } from 'apollo-server';
import { GraphQLError } from 'graphql';
import { FORBIDDEN, UNAUTHORIZED, ERROR } from '../../environment';

const e401s = [
  ERROR.USER.WRONG_CREDENTIALS,
  ERROR.USER.WRONG_PASSWORD,
  ERROR.USER.DOES_NOT_EXIST,
  ERROR.USER.EMPTY_CREDENTIALS,
  ERROR.USER.EMPTY_PERFIL,
  ERROR.USER.ACCESS_INACTIVE,
  UNAUTHORIZED,
];

const e403s = [FORBIDDEN];

export const formatError = err => {
  let error = err;
  const maskError = !(error.originalError instanceof ApolloError) && !e401s.includes(err.message) && !e403s.includes(err.message);
  if (maskError) {
    return new GraphQLError(`Internal Error: [Log id] ${error.originalError}`);
  }
  if (e401s.includes(err.message)) {
    error = {
      message: err.message,
      status: 401,
      location: err.location,
      path: err.path,
      extensions: {
        code: err.extensions.code,
      },
    };
  }
  if (e403s.includes(err.message)) {
    error = {
      message: err.message,
      status: 403,
      location: err.location,
      path: err.path,
      extensions: {
        code: err.extensions.code,
      },
    };
  }

  return error;
};
