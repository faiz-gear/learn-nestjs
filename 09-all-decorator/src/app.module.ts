import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DddController } from './ddd.controller';

@Global() // 声明为全局模块的装饰器, 这样这个模块的exports的服务就能被其他模块的imports导入
@Module({
  imports: [],
  controllers: [AppController, DddController],
  providers: [AppService],
  exports: [AppService],
}) // 声明模块的装饰器
export class AppModule {}
