import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BbbModule } from './bbb/bbb.module';
import { CccModule } from './ccc/ccc.module';

@Module({
  imports: [
    BbbModule.register({
      name: 'faiz-gear',
      age: 20,
    }),
    // CccModule.register({
    //   aaa: 111,
    //   bbb: 'bbb',
    // }),
    // 模块动态注册参数也可以是异步的
    CccModule.registerAsync({
      useFactory: async () => {
        await 111;
        return {
          aaa: 222,
          bbb: 'bbb',
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
