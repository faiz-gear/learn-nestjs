import { Module } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';
import { EtcdModule } from 'src/etcd/etcd.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // EtcdModule.forRoot({
    //   hosts: 'http://localhost:2379',
    //   auth: {
    //     username: 'root',
    //     password: 'admin',
    //   },
    // }),
    EtcdModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          hosts: configService.get('ETCD_HOSTS'),
          auth: {
            username: configService.get('ETCD_USER'),
            password: configService.get('ETCD_PASSWORD'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AaaController],
  providers: [AaaService],
})
export class AaaModule {}
