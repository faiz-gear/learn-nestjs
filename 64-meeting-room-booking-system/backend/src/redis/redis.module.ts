import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisModule as IORedisModule } from '@nestjs-modules/ioredis';

@Global()
@Module({
  imports: [
    IORedisModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379/1',
      options: {
        db: 1,
      },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
