import { Controller, Get, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('download')
  download() {
    const stream = fs.createReadStream('package.json');

    return new StreamableFile(stream, {
      disposition: 'attachment; filename=package.json',
    });
  }
}
