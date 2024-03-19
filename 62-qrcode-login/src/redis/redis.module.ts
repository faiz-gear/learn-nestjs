import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisModule as RedisLibModule } from '@nestjs-modules/ioredis';

@Global()
@Module({
  imports: [
    RedisLibModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379',
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
