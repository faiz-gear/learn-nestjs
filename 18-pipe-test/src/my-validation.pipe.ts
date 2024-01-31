import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  Inject,
  Optional,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MyValidationPipe implements PipeTransform<any> {
  @Inject('validation_options')
  @Optional()
  private readonly options;
  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log(this.options);
    if (!metatype) {
      return value;
    }
    // 将传入的value对象转为metatype类型(使用class-validator装饰器对参数进行验证,有参数校验功能)的对象
    // 这个过程可以理解给value对象的原型上添加了许多class-validator的校验方法
    // 这里的metatype就是body参数的dto
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('参数验证失败');
    }
    return value;
  }
}
