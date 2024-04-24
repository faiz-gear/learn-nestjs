import { NestFactory } from '@nestjs/core';
import { GrpcServerModule } from './grpc-server.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    GrpcServerModule,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:8888',
        package: 'book',
        protoPath: join(__dirname, 'book/book.proto'),
      },
    },
  );
  await app.listen();
}
bootstrap();
