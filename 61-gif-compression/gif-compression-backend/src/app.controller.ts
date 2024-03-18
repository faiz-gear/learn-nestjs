import {
  BadRequestException,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync } from 'fs';
import * as sharp from 'sharp';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(
    // 从请求体的 file 字段中提取文件
    FileInterceptor('file', {
      dest: './uploads',
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return file.path;
  }

  @Get('compression')
  async compression(
    @Query('path') filePath: string,
    @Query('color', ParseIntPipe) color: number,
    // @Query('level') level: number,
    @Res() res: Response,
  ) {
    if (!existsSync(filePath)) {
      throw new BadRequestException('文件不存在');
    }

    const data = await sharp(filePath, {
      animated: true, // 是否为动图
      limitInputPixels: false, // 是否限制输入像素
    })
      .gif({
        colors: color,
      })
      .toBuffer();

    res.set('Content-Disposition', 'attachment; filename="compression.gif"');

    res.send(data);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
