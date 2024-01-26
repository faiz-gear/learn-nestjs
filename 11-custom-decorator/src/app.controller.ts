import {
  Controller,
  Get,
  Headers,
  ParseBoolPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Aaa } from './aaa.decorator';
import { AaaGuard } from './aaa.guard';
import { Bbb } from './bbb.decorator';
import { Ccc, MyHeader, MyQuery } from './ccc.decorator';
import { Ddd } from './ddd.decorator';

// @Controller()
@Ddd()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Aaa('admin')
  @UseGuards(AaaGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  @Bbb('hello2', 'admin')
  getHello2() {
    return this.appService.getHello() + '2';
  }

  @Bbb('hello3', 'admin')
  getHello3(
    @Ccc() ccc: string,
    @Headers('Accept') accept: string,
    @MyHeader('Accept') myAccept: string,
    @Query('aaa') aaa: string,
    @Query('bbb', ParseBoolPipe) bbb: number,
    @MyQuery('aaa') myAaa: string,
    // 也能使用Pipe
    @MyQuery('bbb', ParseBoolPipe) myBbb: boolean,
  ) {
    console.log(
      '🚀 ~ file: app.controller.ts ~ line 42 ~ AppController ~ myBbb',
      myBbb,
      typeof myBbb,
    );
    console.log(
      '🚀 ~ file: app.controller.ts ~ line 41 ~ AppController ~ bbb',
      bbb,
      typeof bbb,
    );
    console.log(
      '🚀 ~ file: app.controller.ts ~ line 40 ~ AppController ~ myAaa',
      myAaa,
    );
    console.log(
      '🚀 ~ file: app.controller.ts ~ line 31 ~ AppController ~ aaa',
      aaa,
    );
    console.log(
      '🚀 ~ file: app.controller.ts ~ line 30 ~ AppController ~ accept',
      accept,
    );
    console.log(
      '🚀 ~ file: app.controller.ts ~ line 26 ~ AppController ~ getHello3 ~ myAccept',
      myAccept,
    );
    return ccc;
  }
}
