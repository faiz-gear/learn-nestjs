import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import os from 'os';
import { getDiskInfoSync } from 'node-disk-info';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('status')
  async status() {
    return {
      memory: this.getMemInfo(),
      cpu: this.getCpuInfo(),
      disk: await this.getDiskInfo(),
      sys: this.getSysInfo(),
    };
  }

  byteToGb(byte: number) {
    return (byte / 1024 / 1024 / 1024).toFixed(2);
  }

  getCpuInfo() {
    const cpus = os.cpus();
    const cpuInfo = cpus.reduce(
      (acc, cpu) => {
        acc.user += cpu.times.user; // 用户使用的时间
        acc.sys += cpu.times.sys; // 系统使用的时间
        acc.idle += cpu.times.idle; // 空闲的时间
        acc.total += cpu.times.user + cpu.times.sys + cpu.times.idle;
        acc.cpuNum++;
        return acc;
      },
      {
        user: 0,
        sys: 0,
        idle: 0,
        total: 0,
        cpuNum: 0,
      },
    );

    const cpu = {
      cpuNum: cpuInfo.cpuNum,
      sys: ((cpuInfo.sys / cpuInfo.total) * 100).toFixed(2),
      used: ((cpuInfo.user / cpuInfo.total) * 100).toFixed(2),
      free: ((cpuInfo.idle / cpuInfo.total) * 100).toFixed(2),
    };
    return cpu;
  }

  getMemInfo() {
    const totalMemory = os.totalmem(); // 总内存
    const freeMemory = os.freemem(); // 空闲内存
    const usedMemory = totalMemory - freeMemory; // 已使用内存
    const memoryUsagePercentage = (
      ((totalMemory - freeMemory) / totalMemory) *
      100
    ).toFixed(2);
    const mem = {
      total: this.byteToGb(totalMemory),
      used: this.byteToGb(usedMemory),
      free: this.byteToGb(freeMemory),
      usage: memoryUsagePercentage,
    };
    return mem;
  }

  async getDiskInfo() {
    const disks = await getDiskInfoSync();
    const sysFiles = disks.map((disk: any) => {
      return {
        dirName: disk._mounted,
        typeName: disk._filesystem,
        total: this.byteToGb(disk._blocks) + 'GB',
        used: this.byteToGb(disk._used) + 'GB',
        free: this.byteToGb(disk._available) + 'GB',
        usage: ((disk._used / disk._blocks || 0) * 100).toFixed(2),
      };
    });
    return sysFiles;
  }

  getSysInfo() {
    return {
      computerName: os.hostname(),
      computerIp: this.getServerIP(),
      osPlatform: os.platform(),
      osArch: os.arch(),
    };
  }

  getServerIP() {
    const nets = os.networkInterfaces();
    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        if (net.family === 'IPv4' && !net.internal) {
          return net.address;
        }
      }
    }
  }
}
