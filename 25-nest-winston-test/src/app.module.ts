import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule } from './winston/winston.module';
import { format, transports } from 'winston';
import * as chalk from 'chalk';

@Module({
  imports: [
    WinstonModule.forRoot({
      level: 'debug',
      format: format.combine(
        format.colorize(),
        // format.simple()
        format.printf(({ context, level, message, time }) => {
          const appStr = chalk.green(`[NEST]`);
          const contextStr = chalk.yellow(`[${context}]`);

          return `${appStr} ${time} ${level} ${contextStr} ${message} `;
        }),
      ),
      transports: [
        new transports.Console(),
        new transports.File({
          filename: 'running2.log',
          dirname: 'log',
          format: format.combine(format.timestamp(), format.json()),
        }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
