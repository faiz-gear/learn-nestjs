import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException) // 指定捕获HttpException的异常
export class AaaFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse<Response>();
    response.status(exception.getStatus()).json({
      msg: exception.message,
    });
  }
}
