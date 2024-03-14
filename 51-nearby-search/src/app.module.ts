import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { RedisModule as RedisLibModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    RedisLibModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379',
    }),
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
