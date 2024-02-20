import { LoggerService } from '@nestjs/common';
import { Logger, createLogger, format, transports } from 'winston';
import * as chalk from 'chalk';
import * as dayjs from 'dayjs';

export class MyLogger implements LoggerService {
  private logger: Logger;
  constructor() {
    this.logger = createLogger({
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
          filename: 'running.log',
          dirname: 'log',
          format: format.combine(format.timestamp(), format.json()),
        }),
      ],
    });
  }

  log(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('info', message, { context, time });
  }

  error(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('info', message, { context, time });
  }

  warn(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('info', message, { context, time });
  }
}
