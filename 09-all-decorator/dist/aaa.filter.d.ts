import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
export declare class AaaFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
