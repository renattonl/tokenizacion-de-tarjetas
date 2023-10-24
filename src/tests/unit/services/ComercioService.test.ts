import createHttpError from 'http-errors';
import { ComercioService } from '../../../services/Comercio.service';
import { AppDataSourcePsql } from '../../../database/DataSourcePsql';

jest.mock('../../../database/DataSourcePsql', () => {
  return {
    AppDataSourcePsql: () => ({
      initialize: jest.fn()
    })
  }
});

describe('ComercioService', () => {
  let comercioService: ComercioService;

  beforeEach(() => {
    comercioService = new ComercioService();
  });

  it('debería lanzar un error 404 si el comercio no existe', async () => {
    const mockFindOne = jest.fn().mockResolvedValueOnce(undefined);
    const mockComercioRepository = {
      findOne: mockFindOne,
    };

    (AppDataSourcePsql as any).getRepository = jest.fn().mockReturnValue(mockComercioRepository);

    await expect(comercioService.findById('id')).rejects.toThrowError(createHttpError.NotFound);
    expect(mockFindOne).toHaveBeenCalledWith({
      where: {
        code: 'id',
      },
    });
  });

  it('debería devolver el comercio si existe', async () => {
    const comercioMock = { id: 1, code: 'code' };
    const mockFindOne = jest.fn().mockResolvedValueOnce(comercioMock);
    const mockComercioRepository = {
      findOne: mockFindOne,
    };

    (AppDataSourcePsql as any).getRepository = jest.fn().mockReturnValue(mockComercioRepository);

    const result = await comercioService.findById('code');
    expect(result).toEqual(comercioMock);
    expect(mockFindOne).toHaveBeenCalledWith({
      where: {
        code: 'code',
      },
    });
  });
});
