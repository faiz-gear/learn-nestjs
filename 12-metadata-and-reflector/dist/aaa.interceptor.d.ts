import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class AaaInterceptor implements NestInterceptor {
    private readonly reflector;
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
