import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction, Request, Response } from 'express';
import { TimeInterceptor } from './time.interceptor';
import { TestFilter } from './test.filter';
// import { LoginGuard } from './login.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局中间件
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('before');
    next();
    console.log('after');
  });

  // 全局路由守卫
  // app.useGlobalGuards(new LoginGuard());

  // 全局拦截器
  // app.useGlobalInterceptors(new TimeInterceptor());

  // 全局管道
  // app.useGlobalPipes(new ValidationPipe());

  // 全局异常响应拦截器
  app.useGlobalFilters(new TestFilter());

  await app.listen(3000);
}
bootstrap();
