import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { AaaException } from './AaaException';
export declare class AaaFilter implements ExceptionFilter {
    catch(exception: AaaException, host: ArgumentsHost): void;
}
