import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

/**
 * 内置Pipe
 * ValidationPipe
ParseIntPipe
ParseBoolPipe
ParseArrayPipe
ParseUUIDPipe
DefaultValuePipe
ParseEnumPipe
ParseFloatPipe
ParseFilePipe
 */

@Injectable()
export class ValidatePipe implements PipeTransform {
  // 管道可以对传入的参数值Value做验证、转换等，然后返回一个新的值
  transform(value: any, metadata: ArgumentMetadata) {
    if (Number.isNaN(parseInt(value))) {
      throw new BadRequestException(`参数${metadata.data}错误`);
    }

    return typeof value === 'number' ? value * 10 : parseInt(value) * 10;
  }
}
