import { Module } from '@nestjs/common';
import { BbbService } from './bbb.service';
import { BbbController } from './bbb.controller';
// import { AaaService } from 'src/aaa/aaa.service';

@Module({
  controllers: [BbbController],
  providers: [
    BbbService,
    // AaaService
  ],
})
export class BbbModule {}
