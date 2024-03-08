import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { BbbService } from './bbb.service';
import { CreateBbbDto } from './dto/create-bbb.dto';
import { UpdateBbbDto } from './dto/update-bbb.dto';
import { LoginGuard } from 'src/login.guard';
import { PermissionGuard } from 'src/user/permission.guard';

@Controller('bbb')
export class BbbController {
  constructor(private readonly bbbService: BbbService) {}

  @UseGuards(LoginGuard)
  @Post()
  create(@Body() createBbbDto: CreateBbbDto) {
    return this.bbbService.create(createBbbDto);
  }

  @UseGuards(LoginGuard, PermissionGuard)
  @Get()
  @SetMetadata('permission', 'query_bbb')
  findAll() {
    return this.bbbService.findAll();
  }

  @UseGuards(LoginGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bbbService.findOne(+id);
  }

  @UseGuards(LoginGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBbbDto: UpdateBbbDto) {
    return this.bbbService.update(+id, updateBbbDto);
  }

  @UseGuards(LoginGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bbbService.remove(+id);
  }
}
