import { Controller, Get, Inject, Query } from '@nestjs/common';
import { StatsService } from './stats.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('统计')
@Controller('statistic')
export class StatsController {
  @Inject(StatsService)
  private statisticService: StatsService;

  @ApiQuery({
    name: 'startTime',
    type: Date,
    required: true,
    description: '开始时间',
  })
  @ApiQuery({
    name: 'endTime',
    type: Date,
    required: true,
    description: '结束时间',
  })
  @Get('users-stats')
  async getUsersStats(
    @Query('startTime') startTime: Date,
    @Query('endTime') endTime: Date,
  ) {
    return this.statisticService.getUsersStats(startTime, endTime);
  }

  @ApiQuery({
    name: 'startTime',
    type: Date,
    required: true,
    description: '开始时间',
  })
  @ApiQuery({
    name: 'endTime',
    type: Date,
    required: true,
    description: '结束时间',
  })
  @Get('meeting-room-stats')
  async getMeetingRoomStats(
    @Query('startTime') startTime: Date,
    @Query('endTime') endTime: Date,
  ) {
    return this.statisticService.getMeetingRoomStats(startTime, endTime);
  }
}
