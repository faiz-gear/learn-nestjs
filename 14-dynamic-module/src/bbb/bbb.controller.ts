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
import { CccService } from 'src/ccc/ccc.service';

@Controller('bbb')
export class BbbController {
  constructor(
    private readonly bbbService: BbbService,
    private readonly cccService: CccService,
  ) {}

  @Post()
  create(@Body() createBbbDto: CreateBbbDto) {
    return this.bbbService.create(createBbbDto);
  }

  @Get()
  findAll() {
    console.log(this.cccService.ccc());
    return this.bbbService.findAll() + this.cccService.ccc();
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
