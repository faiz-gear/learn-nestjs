import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseArrayPipe,
  ParseBoolPipe,
  ParseEnumPipe,
  ParseFloatPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
  ValidationPipe,
  // ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AaaPipe } from './aaa.pipe';
import { Hhh } from './dto/hh.dto';
import { MyValidationPipe } from './my-validation.pipe';
import { Iii } from './dto/ii.dto';

enum Ddd {
  A = 1,
  B = 2,
  C = 3,
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(
    @Query(
      'int',
      new ParseIntPipe({
        // errorHttpStatusCode: HttpStatus.CONFLICT, // 控制错误返回的状态码
        exceptionFactory(error) {
          console.log(
            '🚀 ~ file: app.controller.ts ~ line 10 ~ AppController ~ getHello ~ error',
            error,
          );
          return new HttpException('int' + error, HttpStatus.BAD_REQUEST);
        },
      }),
    )
    aa: number,
  ): string {
    console.log(
      '🚀 ~ file: app.controller.ts ~ line 10 ~ AppController ~ getHello ~ aa',
      aa,
    );
    return this.appService.getHello();
  }

  @Get('aa')
  float(@Query('float', ParseFloatPipe) float: number) {
    console.log(
      '🚀 ~ file: app.controller.ts ~ line 41 ~ AppController ~ aa ~ aa',
      float,
    );
    return 'float' + float;
  }

  @Get('bb')
  boolean(@Query('boolean', ParseBoolPipe) boolean: boolean) {
    console.log(
      '🚀 ~ file: app.controller.ts ~ line 41 ~ AppController ~ bb ~ bb',
      boolean,
    );
    return 'boolean' + boolean;
  }

  @Get('cc')
  array(
    // 传数组类型的查询参数
    @Query(
      'array',
      new ParseArrayPipe({
        items: Number, // 指定数组元素的类型
        separator: '-', // 分隔符
        optional: true, // 可选
      }),
    )
    array: number[],
  ) {
    console.log(
      '🚀 ~ file: app.controller.ts ~ line 41 ~ AppController ~ cc ~ cc',
      array,
    );
    return 'array' + array;
  }

  @Get('dd')
  enum(
    @Query(
      'enum',
      // 传枚举类型的查询参数, 可以限制参数的值
      ParseIntPipe,
      new ParseEnumPipe(Ddd),
    )
    enum1: Ddd,
  ) {
    console.log(
      '🚀 ~ file: app.controller.ts ~ line 41 ~ AppController ~ dd ~ dd',
      enum1,
    );
    return 'enum' + enum1;
  }

  @Get('ee')
  uuid(
    @Query(
      'uuid',
      // 判断是否是uuid
      ParseUUIDPipe,
    )
    uuid: string,
  ) {
    console.log(
      '🚀 ~ file: app.controller.ts ~ line 41 ~ AppController ~ ee ~ ee',
      uuid,
    );
    return 'uuid' + uuid;
  }

  @Get('ff')
  defaultValue(
    @Query('default', new DefaultValuePipe('default value'))
    defaultValue: string,
  ) {
    console.log(
      '🚀 ~ file: app.controller.ts ~ line 130 ~ AppController ~ defaultValue',
      defaultValue,
    );
    return defaultValue;
  }

  @Get('/gg/:id')
  gg(@Query('aa', AaaPipe) aa: string, @Param('id', AaaPipe) id: number) {
    return aa + id;
  }

  @Post('/hh')
  // 使用ValidationPipe验证body参数
  hh(
    @Body(
      // ValidationPipe,
      MyValidationPipe,
    )
    hh: Hhh,
  ) {
    console.log(
      '🚀 ~ file: app.controller.ts ~ line 146 ~ AppController ~ hh ~ hh',
      hh,
    );
    return hh;
  }

  @Post('/ii')
  // 使用ValidationPipe验证body参数
  ii(
    @Body(
      ValidationPipe,
      // MyValidationPipe,
    )
    ii: Iii,
  ) {
    console.log(
      '🚀 ~ file: app.controller.ts ~ line 146 ~ AppController ~ hh ~ hh',
      ii,
    );
    return ii;
  }
}
