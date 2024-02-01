import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { storage } from './file-storage';
import { FileSizeValidationPipe } from './file-size-validation-pipe.pipe';
import { CustomFileValidator } from './custom-file-validator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('aaa')
  @UseInterceptors(
    // 从FormData请求体中获取名为aaa的文件
    // 本质是对multer.single()的封装
    FileInterceptor('aaa', {
      dest: 'uploads',
    }),
  )
  // 单个文件
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body, // 获取除开文件对象字段外的其他字段
  ) {
    console.log('body', body);
    console.log('file', file);
  }

  // 多个文件
  @Post('bbb')
  @UseInterceptors(FilesInterceptor('bbb', 3, { dest: 'uploads' }))
  uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body, // 获取除开文件对象字段外的其他字段
  ) {
    console.log('body', body);
    console.log('files', files);
  }

  // 多个文件字段
  @Post('ccc')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'aaa', maxCount: 2 },
        { name: 'bbb', maxCount: 3 },
      ],
      {
        dest: 'uploads',
      },
    ),
  )
  uploadFileFields(
    @UploadedFiles()
    files: { aaa?: Express.Multer.File[]; bbb?: Express.Multer.File[] },
    @Body() body,
  ) {
    console.log('body', body);
    console.log('files', files);
  }

  // 任意文件字段
  @Post('ddd')
  @UseInterceptors(
    // 会识别出所有文件的字段
    AnyFilesInterceptor({
      // dest: 'uploads',
      storage,
    }),
  )
  uploadAnyFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    console.log('body', body);
    console.log('files', files);
  }

  @Post('eee')
  @UseInterceptors(
    FileInterceptor('aaa', {
      storage,
    }),
  )
  uploadFile2(
    @UploadedFile(FileSizeValidationPipe) file: Express.Multer.File,
    @Body() body,
  ) {
    console.log('body', body);
    console.log('files', file);
  }

  @Post('fff')
  @UseInterceptors(
    FileInterceptor('aaa', {
      dest: 'uploads',
    }),
  )
  uploadFile3(
    @UploadedFile(
      // 会识别出所有文件的字段
      new ParseFilePipe({
        // 应用文件校验器
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
          new CustomFileValidator({}),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body,
  ) {
    console.log('body', body);
    console.log('file', file);
  }
}
