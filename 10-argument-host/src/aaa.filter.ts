import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { AaaException } from './AaaException';
import { Request, Response } from 'express';

@Catch(AaaException)
export class AaaFilter implements ExceptionFilter {
  catch(exception: AaaException, host: ArgumentsHost) {
    console.log(
      '🚀 ~ file: aaa.filter.ts ~ line 7 ~ AaaFilter ~ exception',
      exception,
      host,
    );
    // hose.getArgs()返回当前上下文的request、response、next

    if (host.getType() === 'http') {
      const ctx = host.switchToHttp();
      const res = ctx.getResponse<Response>();
      const req = ctx.getRequest<Request>();

      res.status(500).json({
        aaa: exception.aaa,
        bbb: exception.bbb,
      });
    } else if (host.getType() === 'ws') {
      const ctx = host.switchToWs();
      console.log(ctx);
    } else if (host.getType() === 'rpc') {
      const ctx = host.switchToRpc();
      console.log(ctx);
    }
  }
}
