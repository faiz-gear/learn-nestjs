import { DynamicModule, Global, Module } from '@nestjs/common';
import { MyLogger } from 'src/MyLogger';

// @Global()
// @Module({
//   providers: [MyLogger],
//   exports: [MyLogger],
// })
// export class LoggerModule {}

@Global()
@Module({})
// dynamic module
export class LoggerModule2 {
  static register(options): DynamicModule {
    return {
      module: LoggerModule2,
      providers: [
        {
          provide: 'LOG_OPTIONS',
          useValue: options,
        },
        MyLogger,
      ],
      exports: [MyLogger, 'LOG_OPTIONS'],
    };
  }
}
