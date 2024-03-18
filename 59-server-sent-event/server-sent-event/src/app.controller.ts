import { Controller, Get, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
// import { exec } from 'child_process';
import { readFileSync } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('stream')
  stream() {
    // const childProcess = exec('tail -f ./src/log.txt');
    return new Observable((observer) => {
      // 推送普通数据
      // observer.next({ data: { msg: 'Hello world!' } });

      // setTimeout(() => {
      //   observer.next({ data: { msg: 'Hello world 2!' } });
      // }, 2000);

      // setTimeout(() => {
      //   observer.next({ data: { msg: 'Hello world 3!' } });
      // }, 5000);

      // 推送实时log
      // childProcess.stdout.on('data', (data) => {
      //   console.log(
      //     '🚀 ~ file: app.controller.ts ~ line 36 ~ AppController ~ childProcess.stdout.on ~ data',
      //     data,
      //   );
      //   observer.next({
      //     data: {
      //       msg: data.toString(),
      //     },
      //   });
      // });

      // 推送二进制buffer数据
      const buffer = readFileSync('./package.json');
      observer.next({ data: buffer.toJSON() });
    });
  }
}
