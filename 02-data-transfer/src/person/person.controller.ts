import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

// 1.url params url传递数据
@Controller('api/person')
export class PersonController {
  // 需要放到:idd前面，否则会被:id拦截
  @Get('find') // http://localhost:3000/api/person/find?name=John&age=20
  query(@Query('name') name: string, @Query('age') age: number) {
    return `Query: name=${name}, age=${age}`;
  }

  @Get(':id') // http://localhost:3000/api/person/123
  urlParam(@Param('id') id: string) {
    return `URL param: ${id}`;
  }

  @Post() // Body装饰器会解析urlencoded\json的请求体
  body(@Body() createPersonDto: CreatePersonDto) {
    return `Body: ${JSON.stringify(createPersonDto)}`;
  }

  @Post('file') // formData上传文件格式
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: './uploads',
    }),
  )
  body2(
    @Body() createPersonDto: CreatePersonDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    return `Body: ${JSON.stringify(createPersonDto)}`;
  }
}
