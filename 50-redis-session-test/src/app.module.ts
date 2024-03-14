import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from '@nestjs-modules/ioredis';
import { SessionModule } from './session/session.module';
import { RedisModule as LyRedisModule } from './redis/redis.module';

@Module({
  imports: [
    RedisModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379',
    }),
    SessionModule,
    LyRedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
