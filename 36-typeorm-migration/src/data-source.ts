import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/User'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'admin',
  database: 'migration-test',
  migrations: ['src/migration/**.ts'],
  synchronize: false,
  logging: true,
  entities: [User],
  poolSize: 10,
  connectorPackage: 'mysql2'
})
