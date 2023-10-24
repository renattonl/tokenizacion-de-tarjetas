import createHttpError from 'http-errors';
import { CardDTO } from '../../../controllers/dtos/Card.dto';
import { CreditCardService } from '../../../services/CreditCard.service';
import { decrypt, encrypt, generateToken } from '../../../helpers/tools';
import { TokenDTO } from '../../../controllers/dtos/Token.dto';
import { CardProtectedInterface } from '../../../services/interfaces/CardProtected.interface';
import clientRedis from '../../../database/DataSourceRedis';
import payloadCard from '../../mock/payload.card.json';

jest.mock("redis", () => {
  return {
    createClient: () => ({
      on: jest.fn(),
      connect: async () => ({
        setEx: jest.fn(),
        get: jest.fn(),
        ttl: jest.fn(),
        disconnect: jest.fn(),
      }),
    })
  }
});

jest.mock('../../../helpers/tools', () => ({
  generateToken: jest.fn().mockReturnValue('mockedToken'),
  encrypt: jest.fn().mockReturnValue('encryptedData'),
  decrypt: jest.fn().mockReturnValue('{}'),
}));

describe('CreditCardService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createToken', () => {
    it('crea un token y lo guarda en redis', async () => {
      const body: CardDTO = payloadCard.success;

      const token = await CreditCardService.createToken(body);

      expect(generateToken).toHaveBeenCalled();
      expect(encrypt).toHaveBeenCalledWith(JSON.stringify(body));

      const redisMock = await clientRedis;
      expect(redisMock.disconnect).toHaveBeenCalled();
      expect(token).toBe('mockedToken');
    });
  });

  describe('getDataToken', () => {
    it('devuelve los datos de la tarjeta cuando el token es válido', async () => {
      const body: TokenDTO = { token: 'mockedToken' };
      const redisMock = await clientRedis;
      (redisMock.ttl as any).mockResolvedValue(100);
      (redisMock.get as any).mockResolvedValue('encryptedData');

      const cardProtected: CardProtectedInterface = await CreditCardService.getDataToken(body);

      expect(decrypt).toHaveBeenCalledWith('encryptedData');
      expect(redisMock.ttl).toHaveBeenCalledWith('mockedToken');
      expect(redisMock.get).toHaveBeenCalledWith('mockedToken');
      expect(redisMock.disconnect).toHaveBeenCalled();
      expect(cardProtected).toEqual(expect.objectContaining({}));
    });

    it('devuelve un error cuando el token a experiado', async () => {
      const body: TokenDTO = { token: 'expiredToken' };
      const redisMock = await clientRedis;
      (redisMock.ttl as any).mockResolvedValue(-1);

      await expect(CreditCardService.getDataToken(body)).rejects.toThrowError(createHttpError.BadRequest);

      expect(redisMock.ttl).toHaveBeenCalledWith('expiredToken');
    });
  });
});
