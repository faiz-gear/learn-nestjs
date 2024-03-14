import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CccDto, CccVo } from './ccc.dto';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiBearerAuth('bearer-token')
  @ApiOperation({ summary: 'aaa接口', description: 'aaa描述' })
  @ApiResponse({ status: HttpStatus.OK, description: 'aaa成功', type: String })
  @ApiQuery({
    name: 'a1',
    required: false,
    type: String,
    description: 'a1 param',
    example: 'a1',
  })
  @ApiQuery({
    name: 'a2',
    required: true,
    type: String,
    description: 'a2 param',
    example: 'a2',
  })
  @Get('aaa')
  aaa(@Query('a1') a1, @Query('a2') a2) {
    console.log(a1, a2);
    return 'aaa success';
  }

  @ApiCookieAuth('cookie')
  @ApiOperation({ summary: 'bbb接口', description: 'bbb描述' })
  @ApiResponse({ status: HttpStatus.OK, description: 'bbb成功', type: String })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'id param',
    example: '2',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'id不是111' })
  @Get('bbb/:id')
  bbb(@Param('id') id) {
    console.log(id);
    if (id !== 111)
      throw new HttpException('id不是111', HttpStatus.BAD_REQUEST);
    return 'bbb success';
  }

  @ApiBasicAuth('basic')
  @ApiOperation({ summary: '测试 ccc' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'ccc 成功',
    type: CccVo,
  })
  @ApiBody({
    type: CccDto,
  })
  @Post('ccc')
  ccc(@Body('ccc') ccc: CccDto) {
    console.log(ccc);

    const vo = new CccVo();
    vo.aaa = 111;
    vo.bbb = 222;
    return vo;
  }
}
