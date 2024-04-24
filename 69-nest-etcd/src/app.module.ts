import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EtcdModule } from './etcd/etcd.module';
import { AaaModule } from './aaa/aaa.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'src/.env',
      isGlobal: true,
    }),
    EtcdModule,
    AaaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
