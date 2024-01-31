import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
// 自定义参数pipe
export class AaaPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(
      '🚀 ~ file: aaa.pipe.ts ~ line 6 ~ AaaPipe ~ transform ~ value',
      value, // 传入的参数值
      metadata, // metadata.metatype: 参数类型  metadata.tye: 装饰器类型 data: 传给装饰器的参数名称
    );
    return 'aaa';
  }
}
