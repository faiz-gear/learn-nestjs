import { Global, Module } from '@nestjs/common';
import * as Minio from 'minio';

export const MINIO_CLIENT = 'MINIO_CLIENT';

@Global()
@Module({
  providers: [
    {
      provide: MINIO_CLIENT,
      async useFactory() {
        const client = new Minio.Client({
          endPoint: 'localhost',
          port: 9000,
          useSSL: false,
          accessKey: 'umhjTv507RroR5ei4EY3',
          secretKey: 'HOCOY6SHWKT5kWCYwTyL4KPDeiDELZRzleugXIQk',
        });
        return client;
      },
    },
  ],
  exports: [MINIO_CLIENT],
})
export class MinioModule {}
