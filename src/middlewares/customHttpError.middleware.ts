import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import createError from 'http-errors';
import middy from '@middy/core';
import { ErrorDtoException } from '../exceptions/ErrorDtoException';

const formatJSONResponse = (error: Error) => {
  if (error instanceof ErrorDtoException) {
    return {
      statusCode: 422,
      body: JSON.stringify({ 
        error: true,
        errors: Object.fromEntries(error.errors.map(error => [error.property, Object.values(error.constraints ?? {})])) 
      }),
    };
  }
  if (createError.isHttpError(error)) {
    return {
      body: JSON.stringify({
        error: true,
        message: error.message,
      }),
      statusCode: error.statusCode,
    };
  }
  return {
    body: JSON.stringify({
      error: true,
      message: 'Error Interno del Servidor',
      stack: error.stack,
    }),
    statusCode: 500,
  };
}

export const customHttpErrorMiddleware = () => {
  const onError: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = (request) => {
    const { error } = request;

    if (error) {
      request.response = formatJSONResponse(error);
    }
  }

  return {
    onError,
  };
};
