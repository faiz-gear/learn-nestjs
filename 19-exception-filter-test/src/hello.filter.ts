import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Catch(BadRequestException) // 捕获 BadRequestException 异常, 自定义异常返回响应
export class HelloFilter implements ExceptionFilter {
  constructor(private readonly appService: AppService) {}

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const response = http.getResponse<Response>();
    const statusCode = exception.getStatus();

    const exceptionMessage = (exception.getResponse() as { message: string[] })
      .message;

    const message = Array.isArray(exceptionMessage)
      ? exceptionMessage
      : exception.message;

    response.status(statusCode).json({
      code: statusCode,
      message,
      error: 'Bad Request',
      xxx: 111,
      hello: this.appService.getHello(),
    });
  }
}
