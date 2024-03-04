import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Article } from './entity/Article'
import { Tag } from './entity/Tag'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'admin',
  database: 'typeorm_test',
  synchronize: true,
  logging: false,
  entities: [Article, Tag],
  migrations: [],
  subscribers: [],
  poolSize: 10,
  connectorPackage: 'mysql2'
})
