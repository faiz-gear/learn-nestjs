import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Role } from './user/entities/role.entity';
import { Permission } from './user/entities/permission.entity';
import { RedisModule } from './redis/redis.module';
import { EmailModule } from './email/email.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const host = configService.get('MYSQL_SERVER_HOST');
        const port = configService.get('MYSQL_SERVER_PORT');
        const username = configService.get('MYSQL_SERVER_USERNAME');
        const password = configService.get('MYSQL_SERVER_PASSWORD');
        const database = configService.get('MYSQL_SERVER_DATABASE');

        return {
          type: 'mysql',
          host,
          port,
          username,
          password,
          database,
          synchronize: true,
          logging: true,
          entities: [User, Role, Permission],
          poolSize: 10,
          connectorPackage: 'mysql2',
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), './src/.env'),
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '30m' }, // 默认30分钟
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    RedisModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
