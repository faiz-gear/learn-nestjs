import { Controller, Get, Inject, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientGrpc } from '@nestjs/microservices';

interface FindById {
  id: number;
}
interface Book {
  id: number;
  name: string;
  desc: string;
}
interface BookService {
  findBook(param: FindById): Book;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Inject('BOOK_PACKAGE')
  private readonly clientGrpc: ClientGrpc;

  private bookService: BookService;

  onModuleInit() {
    this.bookService = this.clientGrpc.getService('BookService');
  }

  @Get('book/:id')
  getBookById(@Param('id') id: number): Book {
    return this.bookService.findBook({ id });
  }
}
