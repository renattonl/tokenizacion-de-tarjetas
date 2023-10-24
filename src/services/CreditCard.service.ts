import createHttpError from 'http-errors';
import { CardDTO } from '../controllers/dtos/Card.dto';
import { TokenDTO } from '../controllers/dtos/Token.dto';
import clientRedis from '../database/DataSourceRedis';
import { decrypt, encrypt, generateToken } from '../helpers/tools';
import { CardProtectedInterface } from './interfaces/CardProtected.interface';
export class CreditCardService {

  static async createToken(body: CardDTO) {
    const token = generateToken();
    const redis = await clientRedis;
    const minutesTime = Number(process.env.minutesTimeToken) * 60;
    await redis.setEx(token, minutesTime, encrypt(JSON.stringify(body)));
    await redis.disconnect();

    return token;
  }

  static async getDataToken (body: TokenDTO) {
    const redis = await clientRedis;

    const timeExpired = await redis.ttl(body.token);
    if (timeExpired <= 0) {
      throw new createHttpError.BadRequest('El token ingresado no existe o ya expiró');
    }
    const data = await redis.get(body.token);
    await redis.disconnect();
    const cardProtected = JSON.parse(decrypt(data!));
    delete cardProtected.cvv;
    return cardProtected as CardProtectedInterface;
  }
}