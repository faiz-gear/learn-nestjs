import {
  Controller,
  SetMetadata,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { AaaGuard } from './aaa.guard';

// 自定义class装饰器（使用Ddd装饰器的路由都会加上api前缀）
export const Ddd = () =>
  applyDecorators(
    Controller('api'),
    SetMetadata('ddd', 'ddd'),
    UseGuards(AaaGuard),
  );
