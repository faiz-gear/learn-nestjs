import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/upload')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      dest: './uploads',
    }),
  )
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    console.log(
      '🚀 ~ file: app.controller.ts ~ line 19 ~ AppController ~ uploadFiles ~ body',
      body,
    );
    console.log(
      '🚀 ~ file: app.controller.ts ~ line 19 ~ AppController ~ uploadFiles ~ files',
      files,
    );

    const fileName = body.name.match(/(.+)\-\d+$/)[1];
    const chunkDir = 'uploads/chunks_' + fileName;

    // 创建分片目录
    if (!fs.existsSync(chunkDir)) {
      fs.mkdirSync(chunkDir);
    }

    // 移动文件
    fs.cpSync(files[0].path, chunkDir + '/' + body.name);
    fs.rmSync(files[0].path);
  }

  @Get('/merge')
  mergeFiles(@Query('name') name: string) {
    const chunkDir = 'uploads/chunks_' + name;
    const chunkPaths = fs.readdirSync(chunkDir);
    chunkPaths.sort(
      (a, b) => Number(a.split('-')[1]) - Number(b.split('-')[1]),
    );
    let startPosition = 0;
    let count = 0;
    // 读取chunk，合并文件
    chunkPaths.forEach((chunkPath) => {
      const filePath = chunkDir + '/' + chunkPath;
      const stream = fs.createReadStream(filePath);
      stream
        .pipe(
          fs.createWriteStream('./uploads/' + name, { start: startPosition }),
        )
        .on('finish', () => {
          count++;
          if (count === chunkPaths.length) {
            fs.rmdirSync(chunkDir, {
              recursive: true,
            });
          }
        });

      startPosition += fs.statSync(filePath).size;
    });
  }
}
