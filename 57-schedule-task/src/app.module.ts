import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskService } from './task.service';
import { ScheduleModule, SchedulerRegistry } from '@nestjs/schedule';
import { AaaModule } from './aaa/aaa.module';
import { CronJob } from 'cron';

@Module({
  imports: [ScheduleModule.forRoot(), AaaModule],
  controllers: [AppController],
  providers: [AppService, TaskService],
})
export class AppModule implements OnApplicationBootstrap {
  @Inject(SchedulerRegistry)
  private readonly schedulerRegistry: SchedulerRegistry;

  onApplicationBootstrap() {
    const crons = this.schedulerRegistry.getCronJobs();
    console.log(crons);

    // 删除所有定时任务
    crons.forEach((cron, key) => {
      cron.stop();
      this.schedulerRegistry.deleteCronJob(key);
    });

    // 删除所有interval任务

    const intervals = this.schedulerRegistry.getIntervals();
    intervals.forEach((intervalName) => {
      const interval = this.schedulerRegistry.getInterval(intervalName);
      clearInterval(interval);

      this.schedulerRegistry.deleteInterval(intervalName);
    });

    // 删除所有timeout任务
    const timeouts = this.schedulerRegistry.getTimeouts();
    timeouts.forEach((timeoutName) => {
      const timeout = this.schedulerRegistry.getTimeout(timeoutName);
      clearTimeout(timeout);
      this.schedulerRegistry.deleteTimeout(timeoutName);
    });

    console.log(this.schedulerRegistry.getCronJobs());
    console.log(this.schedulerRegistry.getIntervals());
    console.log(this.schedulerRegistry.getTimeouts());

    // 添加定时任务
    const job = new CronJob(`0/5 * * * * *`, () => {
      console.log('cron job');
    });

    this.schedulerRegistry.addCronJob('job1', job);
    job.start();

    const interval = setInterval(() => {
      console.log('interval job');
    }, 3000);
    this.schedulerRegistry.addInterval('job2', interval);

    const timeout = setTimeout(() => {
      console.log('timeout job');
    }, 5000);
    this.schedulerRegistry.addTimeout('job3', timeout);
  }
}
