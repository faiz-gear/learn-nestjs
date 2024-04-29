import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateTodoList } from './todolist-create.dto';
import { UpdateTodoList } from './todolist-update.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  @Inject(PrismaService)
  private prismaService: PrismaService;

  async query() {
    return this.prismaService.todoItem.findMany({
      select: {
        id: true,
        content: true,
        createTime: true,
        isDone: true,
      },
    });
  }

  async create(createTodoListDto: CreateTodoList) {
    return this.prismaService.todoItem.create({
      data: createTodoListDto,
      select: {
        id: true,
        content: true,
        createTime: true,
        isDone: true,
      },
    });
  }

  async update(id: number, updateTodoListDto: UpdateTodoList) {
    return this.prismaService.todoItem.update({
      where: {
        id: id - 0,
      },
      data: {
        content: updateTodoListDto.content,
        isDone: updateTodoListDto.isDone,
      },
      select: {
        id: true,
        content: true,
        createTime: true,
        isDone: true,
      },
    });
  }

  async remove(id: number) {
    return this.prismaService.todoItem.delete({
      where: {
        id,
      },
    });
  }
}
