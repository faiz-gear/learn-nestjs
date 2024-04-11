import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RequireLogin, UserInfo } from 'src/custom.decorator';
import { CreateBookingDto } from './dto/create-booking.dto';

@ApiTags('预定')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiBearerAuth()
  @ApiQuery({
    name: 'pageNo',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'username',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'meetingRoomName',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'bookingTimeStart',
    required: false,
    type: Date,
  })
  @ApiQuery({
    name: 'bookingTimeEnd',
    required: false,
    type: Date,
  })
  @ApiQuery({
    name: 'bookingPosition',
    required: false,
    type: String,
  })
  @RequireLogin()
  @Get('list')
  async list(
    @Query('pageNo', new DefaultValuePipe(1)) pageNo: number,
    @Query('pageSize', new DefaultValuePipe(10)) pageSize: number,
    @Query('username') username: string,
    @Query('meetingRoomName') meetingRoomName: string,
    @Query('bookingTimeStart') bookingTimeStart: Date,
    @Query('bookingTimeEnd') bookingTimeEnd: Date,
    @Query('bookingPosition') bookingPosition: string,
  ) {
    return this.bookingService.find(
      pageNo,
      pageSize,
      username,
      meetingRoomName,
      bookingTimeStart,
      bookingTimeEnd,
      bookingPosition,
    );
  }

  @ApiBody({
    type: CreateBookingDto,
  })
  @Post('add')
  @RequireLogin()
  async add(
    @Body() booking: CreateBookingDto,
    @UserInfo('userId') userId: number,
  ) {
    await this.bookingService.add(booking, userId);
    return 'success';
  }
}
