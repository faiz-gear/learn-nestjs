
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateTodoItemInput {
    content: string;
}

export interface UpdateTodoItemInput {
    id: number;
    content?: Nullable<string>;
    isDone?: Nullable<boolean>;
}

export interface TodoItem {
    id?: Nullable<number>;
    content?: Nullable<string>;
    isDone?: Nullable<boolean>;
}

export interface IQuery {
    todoList(): Nullable<TodoItem>[] | Promise<Nullable<TodoItem>[]>;
    queryById(id: number): Nullable<TodoItem> | Promise<Nullable<TodoItem>>;
}

export interface IMutation {
    createTodoItem(todoItem: CreateTodoItemInput): TodoItem | Promise<TodoItem>;
    updateTodoItem(todoItem: UpdateTodoItemInput): TodoItem | Promise<TodoItem>;
    removeTodoItem(id: number): Nullable<number> | Promise<Nullable<number>>;
}

type Nullable<T> = T | null;
