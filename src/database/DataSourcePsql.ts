import "reflect-metadata";
import { DataSource } from "typeorm";
import { Comercio } from "../entities/Comercio.entity";

export const AppDataSourcePsql = new DataSource({
  type: "postgres",
  host: process.env.PSQL_HOST ?? "localhost",
  port: Number(process.env.PSQL_PORT ?? 5001),
  username: process.env.PSQL_USER ?? "user",
  password: process.env.PSQL_PASS ?? "pass",
  database: process.env.PSQL_DB ?? "db",
  synchronize: true,
  logger: 'debug', 
  logging: false,
  entities: [
    Comercio,
  ],
  subscribers: [],
  migrations: [],
}).initialize();
