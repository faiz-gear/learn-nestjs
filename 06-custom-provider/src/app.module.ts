import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService, // 简写方式声明模块依赖
    {
      // provide: AppService, // class做token, 在注入时可以省掉@Inject
      provide: 'app_service', // string做token
      // useClass: AppService, // 指定class
      useValue: new AppService(), // 指定值
    },
    {
      provide: 'person',
      useValue: {
        name: 'user',
        age: 20,
      }, // 指定值
    },
    {
      provide: 'factory_person',
      useFactory: async (
        appService: AppService,
        person: { name: string; age: number },
      ) => {
        await new Promise((resolve) => {
          setTimeout(resolve, 3000);
        });
        return {
          name: 'user2',
          age: 30,
          appService,
          person,
        };
      }, // 工厂函数
      inject: [AppService, 'person'], // 工厂函数支持注入别的provider, 会作为参数传入函数
    },
  ],
})
export class AppModule {}
