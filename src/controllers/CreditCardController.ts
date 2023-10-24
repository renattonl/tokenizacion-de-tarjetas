import type { APIGatewayProxyEvent } from "aws-lambda";
import { plainToClass } from "class-transformer";
import { CardDTO } from "./dtos/Card.dto";
import { TokenDTO } from "./dtos/Token.dto";
import { CreditCardService } from "../services/CreditCard.service";

export class CreditCardController {

  static generateToken = async (event: APIGatewayProxyEvent) => {
    const body = plainToClass(CardDTO, event.body);
    return {
      token: await CreditCardService.createToken(body),
    };
  }

  static getDataFromToken = async (event: APIGatewayProxyEvent) => {
    const body = plainToClass(TokenDTO, event.body);
    return CreditCardService.getDataToken(body);
  }
}