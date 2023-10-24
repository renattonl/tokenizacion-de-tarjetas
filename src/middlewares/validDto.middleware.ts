import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import middy from "@middy/core";
import { ErrorDtoException } from "../exceptions/ErrorDtoException";

export const validDtoMiddleware = <T extends object>(dtoClass: ClassConstructor<T>): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async ({ event }): Promise<void> => {
    const dto = plainToClass(dtoClass, event.body);
    const errors = await validate( dto );
    if (errors.length > 0) {
      throw new ErrorDtoException(errors);
    }
  }
  return {
    before,
  };
};