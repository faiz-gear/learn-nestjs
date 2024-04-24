import { DynamicModule, Module } from '@nestjs/common';
import { EtcdService } from './etcd.service';
import { Etcd3, IOptions } from 'etcd3';

export const ETCD_CLIENT_TOKEN = 'ETCD_CLIENT';

export const ETCD_MODULE_OPTIONS = 'ETCD_MODULE_OPTIONS';

export interface EtcdModuleAsyncOptions {
  useFactory?: (...args: any[]) => Promise<IOptions> | IOptions;
  inject?: any[];
}

@Module({})
export class EtcdModule {
  static forRoot(options: IOptions): DynamicModule {
    return {
      module: EtcdModule,
      providers: [
        EtcdService,
        {
          provide: 'ETCD_CLIENT',
          useFactory(options) {
            const client = new Etcd3(options);
            return client;
          },
          inject: [ETCD_MODULE_OPTIONS],
        },
        {
          provide: ETCD_MODULE_OPTIONS,
          useValue: options,
        },
      ],
      exports: [EtcdService],
    };
  }

  static forRootAsync(options: EtcdModuleAsyncOptions): DynamicModule {
    return {
      module: EtcdModule,
      providers: [
        EtcdService,
        {
          provide: ETCD_CLIENT_TOKEN,
          useFactory(options: IOptions) {
            console.log(
              '🚀 ~ file: etcd.module.ts ~ line 46 ~ EtcdModule ~ useFactory ~ options',
              options,
            );
            return new Etcd3(options);
          },
          inject: [ETCD_MODULE_OPTIONS],
        },
        {
          provide: ETCD_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ],
      exports: [EtcdService],
    };
  }
}
