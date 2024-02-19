import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyLogger } from './MyLogger';
// import { LoggerModule } from './logger/logger.module';
import { AaaModule } from './aaa/aaa.module';
import { LoggerModule2 } from './logger/logger.module';

@Module({
  imports: [
    // LoggerModule,
    AaaModule,
    LoggerModule2.register({ p1: 'p1', p2: 'p2' }),
  ],
  controllers: [AppController],
  providers: [AppService, MyLogger],
  exports: [AppService],
})
export class AppModule {}
