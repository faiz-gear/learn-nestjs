import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  setTimeout(() => {
    app.close(); // 触发app销毁流程, 不会退出进程
  }, 3000);
}
bootstrap();
