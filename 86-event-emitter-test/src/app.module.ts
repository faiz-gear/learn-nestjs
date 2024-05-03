import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserModule } from './user/user.module';
import { NotificationModule } from './notification/notification.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true, // enable the use of the '*' character
      delimiter: '.', // set the delimiter used to segment namespaces
    }),
    AaaModule,
    BbbModule,
    UserModule,
    NotificationModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
