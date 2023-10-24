import { Comercio } from "../../entities/Comercio.entity";
import { AppDataSourcePsql } from "../../database/DataSourcePsql";

const DATA_DEMO = [
  {code: 'pAgXyHTBMS4DTGdB', name: 'Comercio 1'},
  {code: 'YXDmfF3YYAXNQ4lx', name: 'Comercio 2'},
  {code: 'nKMHGltLm897dWiD', name: 'Comercio 3'},
  {code: 'z0W7v8qMKYvgHRjI', name: 'Comercio 4'},
  {code: 'VUffS1xY6or4lbfR', name: 'Comercio 5'},
];

const seed = async () => {
  const dataSource = await AppDataSourcePsql;
  const repository = await dataSource.getRepository(Comercio);
  const data = DATA_DEMO.map((row) => repository.createQueryBuilder().insert().values(row).orIgnore().execute());
  return Promise.all(data);
};

seed()
  .then(() => console.log('Seed completed!', DATA_DEMO))
  .catch((error: Error) => console.log(`Error seed: ${error.message}`) )