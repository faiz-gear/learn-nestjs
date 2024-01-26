import {
  Controller,
  Get,
  Header,
  HostParam,
  HttpCode,
  Next,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Controller({
  host: ':host.0.0.1', // 只有访问xxx.0.0.1的时候才会进入这个控制器
  path: '/ddd', // 只有访问/ddd的时候才会进入这个控制器, 可以理解成baseUrl
})
export class DddController {
  @Get('bbb')
  hello(@HostParam('host') host) {
    console.log(
      '🚀 ~ file: ddd.controller.ts ~ line 10 ~ DddController ~ hello ~ host',
      host,
    );
    // 获取host参数
    return host;
  }

  @Get('ccc')
  ccc(@Req() req: Request) {
    // 获取请求对象
    console.log(
      '🚀 ~ file: ddd.controller.ts ~ line 20 ~ DddController ~ ccc ~ req',
      req.url,
      req.hostname,
    );

    return 'ccc';
  }

  @Get('eee')
  eee(
    @Res({
      passthrough: true, // 如果为true，就不需要手动调用res.send()方法
    })
    res: Response,
  ) {
    // 获取响应对象，注入响应对象后需要手动调用res.send()方法
    console.log(
      '🚀 ~ file: ddd.controller.ts ~ line 31 ~ DddController ~ eee ~ res',
      res,
    );

    // res.end('eee');

    return 'eee';
  }

  @Get('fff')
  fff(@Next() next: NextFunction) {
    // 注入next也不会返回响应
    console.log('fff handler1');
    next();
    return 'fff';
  }

  // 两个handler处理同一个请求
  @Get('fff')
  fff2() {
    console.log('fff handler2');
    return 'fff2';
  }

  @Get('ggg')
  @HttpCode(222) // 设置响应码
  ggg() {
    return 'ggg';
  }

  @Get('hhh')
  @Header('age', '20') // 设置响应头部
  hhh() {
    return 'ggg';
  }

  @Get('iii')
  // @Redirect('http://baidu.com') // 重定向
  @Redirect() // 重定向
  iii() {
    // return 'iii';

    return {
      url: 'https://www.baidu.com',
      statusCode: 302,
    };
  }
}
