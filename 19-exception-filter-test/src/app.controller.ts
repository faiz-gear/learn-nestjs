import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
  // HttpException,
  // HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { HelloFilter } from './hello.filter';
import { AaaDto } from './dto/aaa.dto';

@Controller()
@UseFilters(HelloFilter)
@UsePipes(ValidationPipe)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // throw new HttpException('xxx', HttpStatus.BAD_REQUEST);
    throw new BadRequestException('xxx');
  }

  @Post('aaa')
  aaa(@Body() aaaDto: AaaDto) {
    console.log(
      '🚀 ~ file: app.controller.ts ~ line 28 ~ AppController ~ aaa ~ aaaDto',
      aaaDto,
    );
    return 'success';
  }
}
