import { Get, UseGuards, applyDecorators } from '@nestjs/common';
import { Aaa } from './aaa.decorator';
import { AaaGuard } from './aaa.guard';

// 合并多个装饰器
export const Bbb = (path: string, role: string) =>
  applyDecorators(Get(path), Aaa(role), UseGuards(AaaGuard));
