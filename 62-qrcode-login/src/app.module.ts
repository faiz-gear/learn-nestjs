import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QrcodeModule } from './qrcode/qrcode.module';
import { RedisModule } from './redis/redis.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    QrcodeModule,
    RedisModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1d' },
      global: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
