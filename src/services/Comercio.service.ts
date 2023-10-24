import createHttpError from 'http-errors';
import { AppDataSourcePsql } from '../database/DataSourcePsql';
import { Comercio } from '../entities/Comercio.entity';

export class ComercioService {

  async findById(id: string) {
    const comercioRepository = (await AppDataSourcePsql).getRepository(Comercio)
    
    const row = await comercioRepository.findOne({
      where: {
        code: id,
      }
    });
    
    if (!row) {
      throw new createHttpError.NotFound('El comercio no existe');
    }

    return row;
  }
}