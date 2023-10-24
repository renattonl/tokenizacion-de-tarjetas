import middy from '@middy/core';
import globalMiddlewares from './middlewares/globalMiddlewares';
import { CreditCardController } from './controllers';
import { validDtoMiddleware } from './middlewares/validDto.middleware';
import { CardDTO } from './controllers/dtos/Card.dto';
import { TokenDTO } from './controllers/dtos/Token.dto';

export const generateToken = middy()
  .use(globalMiddlewares)
  .use(validDtoMiddleware(CardDTO))
  .handler(CreditCardController.generateToken);

export const getDataFromToken = middy()
  .use(globalMiddlewares)
  .use(validDtoMiddleware(TokenDTO))
  .handler(CreditCardController.getDataFromToken);