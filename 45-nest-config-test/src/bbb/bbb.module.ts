import { Module } from '@nestjs/common';
import { BbbService } from './bbb.service';
import { BbbController } from './bbb.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // 局部配置模块, 会与全局配置模块合并
    ConfigModule.forFeature(() => {
      return {
        local: 222,
      };
    }),
  ],
  controllers: [BbbController],
  providers: [BbbService],
})
export class BbbModule {}
