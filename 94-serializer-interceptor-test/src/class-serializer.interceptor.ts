import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClassTransformOptions } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { CLASS_SERIALIZER_OPTIONS } from './serialize-options.decorator';
import * as ClassTransformer from 'class-transformer';

function isObject(value) {
  return value !== null && typeof value === 'object';
}

@Injectable()
export class ClassSerializerInterceptor implements NestInterceptor {
  @Inject(Reflector)
  protected readonly reflector: Reflector;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextOptions = this.getContextOptions(context);
    return next
      .handle()
      .pipe(map((res) => this.serialize(res, contextOptions)));
  }

  protected getContextOptions(
    context: ExecutionContext,
  ): ClassTransformOptions | undefined {
    return this.reflector.getAllAndOverride(CLASS_SERIALIZER_OPTIONS, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  serialize(
    response: Record<string, any> | Array<Record<string, any>>,
    options: ClassTransformOptions,
  ) {
    // 如果返回的数据是流，则直接返回
    if (!isObject(response) || response instanceof StreamableFile) {
      return response;
    }

    return Array.isArray(response)
      ? response.map((item) => this.transformToNewPlain(item, options))
      : this.transformToNewPlain(response, options);
  }

  transformToNewPlain(plain: any, options: ClassTransformOptions) {
    if (!plain) {
      return plain;
    }

    return ClassTransformer.instanceToPlain(plain, options);
  }
}
