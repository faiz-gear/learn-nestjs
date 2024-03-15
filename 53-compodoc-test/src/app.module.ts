import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BbbModule } from './bbb/bbb.module';
import { AaaModule } from './aaa/aaa.module';

@Module({
  imports: [AaaModule, BbbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
