import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'validation_options',
      useValue: {
        whitelist: true,
        forbidNonWhitelisted: true,
      },
    },
    {
      provide: APP_PIPE, // 全局pipe, 和APP_GUARD\APP_INTERCEPTOR一样
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
