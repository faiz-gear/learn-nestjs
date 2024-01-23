import { Module } from '@nestjs/common';
import { OtherService } from './other.service';

@Module({
  providers: [OtherService],
  exports: [OtherService], // other模块可以导出OtherService，其他模块可以导入OtherModule，从而注入OtherService
})
export class OtherModule {}
