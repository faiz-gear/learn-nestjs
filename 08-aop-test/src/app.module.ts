import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogMiddleware } from './log.middleware';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    // IOC的方式使用全局路由守卫，这种方式可以注入其他服务
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
    // IOC的方式使用全局拦截器，这种方式可以注入其他服务
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeInterceptor,
    },
    // IOC的方式使用全局管道，这种方式可以注入其他服务
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidatePipe,
    // },
    // IOC的方式使用全局异常响应拦截器，这种方式可以注入其他服务
    {
      provide: APP_FILTER,
      useClass: TestFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 配置中间件并设置在哪些路由生效(局部中间件)
    consumer.apply(LogMiddleware).forRoutes('aaa*');
  }
}
