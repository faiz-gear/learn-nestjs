import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BbbService } from './bbb.service';
import { CreateBbbDto } from './dto/create-bbb.dto';
import { UpdateBbbDto } from './dto/update-bbb.dto';
import { OnEvent } from '@nestjs/event-emitter';

@Controller('bbb')
export class BbbController {
  constructor(private readonly bbbService: BbbService) {}

  @OnEvent('aaa.*') // 通配符监听 aaa 下的所有事件
  handleAaaFindEvent(payload: any) {
    console.log('handleAaaFindEvent', payload);
    // 监听到 aaa.find 事件后，调用 bbb 的业务逻辑
    this.bbbService.create({ name: 'bbb.create' });
  }

  @Post()
  create(@Body() createBbbDto: CreateBbbDto) {
    return this.bbbService.create(createBbbDto);
  }

  @Get()
  findAll() {
    return this.bbbService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bbbService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBbbDto: UpdateBbbDto) {
    return this.bbbService.update(+id, updateBbbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bbbService.remove(+id);
  }
}
