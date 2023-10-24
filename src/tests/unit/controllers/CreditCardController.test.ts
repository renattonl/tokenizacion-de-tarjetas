import type { APIGatewayProxyEvent } from "aws-lambda";
import { CreditCardController } from '../../../controllers/CreditCardController';
import payloadCard from '../../mock/payload.card.json';
import payloadToken from '../../mock/payload.token.json';


jest.mock("redis", () => {
  return {
    createClient: () => ({
      on: jest.fn(),
      connect: jest.fn(),
    })
  }
});
jest.mock("../../../services/CreditCard.service", () => {
  return {
    CreditCardService: {
      createToken: async () => 'token',
      getDataToken: async () => (payloadCard.success),
    }
  }
});

describe("CreditCardController", () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Generar un token valido", async () => {
    const mockEvent: APIGatewayProxyEvent = {
      body: JSON.stringify(payloadCard.success),
    } as APIGatewayProxyEvent;

    const response = await CreditCardController.generateToken(mockEvent);
    expect(response).toEqual({ token: 'token' });
  });

  test("Obtener los datos de la tarjeta.", async () => {
    const mockEvent: APIGatewayProxyEvent = {
      body: JSON.stringify(payloadToken.success),
    } as APIGatewayProxyEvent;

    const response = await CreditCardController.getDataFromToken(mockEvent);
    expect(response).toEqual(payloadCard.success);
  });
});
