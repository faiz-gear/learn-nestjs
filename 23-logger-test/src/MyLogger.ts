import {
  ConsoleLogger,
  Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { AppService } from './app.service';
export class MyLogger implements LoggerService {
  @Inject('LOG_OPTIONS')
  public options: Record<string, any>;
  log(message: string, context: string) {
    console.log(this.options);
    console.log(`---log---[${context}]---`, message);
  }

  error(message: string, context: string) {
    console.log(`---error---[${context}]---`, message);
  }

  warn(message: string, context: string) {
    console.log(`---warn---[${context}]---`, message);
  }
}

// export class MyLogger extends ConsoleLogger {
//   log(message: string, context: string) {
//     console.log(`---log---[${context}]---`, message);
//   }
// }

// 可注入依赖的logger
// @Injectable()
// export class MyLogger extends ConsoleLogger {
//   @Inject(AppService)
//   private appService: AppService;

//   log(message: string, context: string) {
//     console.log(this.appService.getHello());
//     console.log(`---log---[${context}]---`, message);
//   }
// }
