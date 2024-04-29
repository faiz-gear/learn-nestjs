import { Inject } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateTodoItemInput, UpdateTodoItemInput } from 'src/graphql';
import { PrismaService } from 'src/prisma/prisma.service';

@Resolver()
export class TodolistResolver {
  @Inject(PrismaService)
  private prismaService: PrismaService;

  @Query('todoList')
  async todolist() {
    return this.prismaService.todoItem.findMany({
      select: {
        id: true,
        content: true,
        createTime: true,
        isDone: true,
      },
    });
  }

  @Query('queryById')
  async queryById(@Args('id') id: number) {
    return this.prismaService.todoItem.findUnique({
      where: {
        id,
      },
    });
  }

  @Mutation('createTodoItem')
  async createTodoItem(@Args('todoItem') todoItem: CreateTodoItemInput) {
    return this.prismaService.todoItem.create({
      data: todoItem,
      select: {
        id: true,
        content: true,
        createTime: true,
      },
    });
  }

  @Mutation('updateTodoItem')
  async updateTodoItem(@Args('todoItem') todoItem: UpdateTodoItemInput) {
    return this.prismaService.todoItem.update({
      where: {
        id: todoItem.id,
      },
      data: todoItem,
      select: {
        id: true,
        content: true,
        createTime: true,
      },
    });
  }

  @Mutation('removeTodoItem')
  async removeTodoItem(@Args('id') id: number) {
    await this.prismaService.todoItem.delete({
      where: {
        id,
      },
    });
    return id;
  }
}
