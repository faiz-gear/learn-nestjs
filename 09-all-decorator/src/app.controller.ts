import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpException,
  HttpStatus,
  Ip,
  Optional,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  Render,
  Session,
  SetMetadata,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AaaFilter } from './aaa.filter';
import { CreateBbbDto } from './dto/create-bbb.dto';
import { AaaGuard } from './aaa.guard';
import { AaaInterceptor } from './aaa.interceptor';

// 声明Controller的装饰器
@Controller()
@SetMetadata('roles', ['user'])
export class AppController {
  constructor() {}

  // 注入服务
  @Optional() // 如果依赖的服务没有被注入，那么就不会报错, 也能正常创建这个控制器
  private readonly appService: AppService;

  @Get()
  @UseFilters(AaaFilter)
  @SetMetadata('roles', ['admin'])
  @UseGuards(AaaGuard)
  @UseInterceptors(AaaInterceptor)
  getHello(): string {
    // throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    return 'hello';
  }

  @Get('/bbb/:id')
  bbb(
    @Param('id', ParseIntPipe) id: number,
    @Query('bbbQuery', ParseBoolPipe) bbbQuery: boolean,
  ) {
    console.log(typeof id, typeof bbbQuery);
    console.log(id, bbbQuery);
    return id + '' + bbbQuery;
  }

  @Post('/bbb')
  postBbb(@Body() body: CreateBbbDto) {
    console.log(body);
    return body;
  }

  @Get('ccc')
  ccc(
    @Headers() header: Record<string, any>, // 获取所有的header
    @Headers('accept') accept: string, // 获取accept的header
  ) {
    console.log(accept);
    return header;
  }

  @Get('/ip')
  ip(@Ip() ip: string) {
    console.log(ip);
    return ip;
  }

  @Get('/session')
  session(@Session() session) {
    // 获取session
    console.log(session);
    // session对象里面存储信息
    session.language = 'en';
    return session;
  }

  @Get('user')
  @Render('user')
  user() {
    return { name: 'faiz-gear', age: 20 };
  }
}
