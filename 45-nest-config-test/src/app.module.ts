import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BbbModule } from './bbb/bbb.module';
// import * as path from 'path';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: [
      //   path.join(process.cwd(), '.env.local'),
      //   path.join(process.cwd(), '.env'),
      // ], // 合并 .env 和 .env.local 文件, 前面的优先级更高
      load: [config],
      isGlobal: true,
    }),
    BbbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
