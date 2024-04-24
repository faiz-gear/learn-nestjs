import { Controller, Get } from '@nestjs/common';
import { GrpcServerService } from './grpc-server.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class GrpcServerController {
  constructor(private readonly grpcServerService: GrpcServerService) {}

  @Get()
  getHello(): string {
    return this.grpcServerService.getHello();
  }

  @GrpcMethod('BookService', 'FindBook')
  findBook(data: { id: number }) {
    const books = [
      { id: 1, name: 'Book 1', desc: 'Book 1' },
      { id: 2, name: 'Book 2', desc: 'Book 2' },
    ];
    return books.find((book) => book.id === data.id);
  }
}
