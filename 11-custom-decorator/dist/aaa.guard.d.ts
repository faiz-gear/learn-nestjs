import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class AaaGuard implements CanActivate {
    private readonly reflector;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
