import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './MyLogger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
    // logger: ['error', 'warn', 'log'],
    // logger: new MyLogger(),
    bufferLogs: true,
  });
  app.useLogger(app.get(MyLogger));
  await app.listen(3000);
}
bootstrap();
