import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import createError from 'http-errors';
import middy from "@middy/core";
import { ComercioService } from "../services/Comercio.service";

export const validTokenMiddleware = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async ({ event }): Promise<void> => {
    const [, pk] = (event.headers.authorization ?? '').split(' ');
    if (!pk) {
      throw new createError.BadRequest('El token es requerido');
    }
    const regex = /^pk_(test|dev|prod)_[a-zA-Z0-9]+$/;
    if (!regex.test(pk)) {
      throw new createError.BadRequest('El token no es válido');
    }
    const [,, id] = pk.split('_');

    const comercioService = new ComercioService();
    await comercioService.findById(id);
  }
  return {
    before,
  };
};