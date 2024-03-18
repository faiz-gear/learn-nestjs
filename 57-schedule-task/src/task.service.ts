import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';
import { AaaService } from './aaa/aaa.service';

@Injectable()
export class TaskService {
  @Inject(AaaService)
  private readonly aaaService: AaaService;

  @Cron(CronExpression.EVERY_5_SECONDS, {
    name: 'task',
    timeZone: 'Asia/shanghai',
  })
  handleCron() {
    console.log('task execute', this.aaaService.findAll());
  }

  @Interval('task2', 1000)
  handleInterval() {
    console.log('task2 execute', this.aaaService.findAll());
  }

  @Timeout('task3', 3000)
  handleTimeout() {
    console.log('task3 execute', this.aaaService.findAll());
  }
}
