import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AaaInterceptor } from './aaa.interceptor';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // app.useGlobalInterceptors无法注入依赖，但是多数情况下我们需要使用全局interceptor, 同时还需要一些provider
      // 这里我们就可以使用APP_INTERCEPTOR来注入interceptor, Nest会把它当做全局interceptor来使用, 同时还能注入依赖
      provide: APP_INTERCEPTOR,
      useClass: AaaInterceptor,
    },
  ],
})
export class AppModule {}
