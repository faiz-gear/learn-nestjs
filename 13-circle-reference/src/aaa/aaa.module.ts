import { Module, forwardRef } from '@nestjs/common';
import { BbbModule } from 'src/bbb/bbb.module';

@Module({
  imports: [forwardRef(() => BbbModule)], // 解决module循环依赖问题
})
export class AaaModule {}
