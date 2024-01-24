import { Global, Module } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';

@Global() // 全局模块, 这样别的模块可以直接使用 AaaModule 中的服务Service, 但是不推荐使用, 这样会不知道注入的来源
@Module({
  controllers: [AaaController],
  providers: [AaaService],
  exports: [AaaService],
})
export class AaaModule {}
