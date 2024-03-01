import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/User'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'LUyao514',
  database: 'practice',
  synchronize: true, // 如果database不存在和Entity对应的表的时候，自动同步生成sql语句建表
  logging: true, // 是否打印sql语句
  // entities: [User], // 指定有哪些与数据库的表对应的实体
  entities: [User], // 指定有哪些与数据库的表对应的实体
  migrations: [], // 数据库迁移
  subscribers: [], // Entity生命周期的监听
  poolSize: 10, // 连接池大小
  connectorPackage: 'mysql2', // 连接数据库的驱动
  extra: {
    // 发送给驱动包（这里是mysql2）的额外配置
    authPlugin: 'sha256_password'
  }
})
