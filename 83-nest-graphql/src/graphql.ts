
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface Student {
    id?: Nullable<string>;
    name?: Nullable<string>;
    sex?: Nullable<boolean>;
    age?: Nullable<number>;
}

export interface Teacher {
    id?: Nullable<string>;
    name?: Nullable<string>;
    age?: Nullable<number>;
    subject?: Nullable<Nullable<string>[]>;
    students?: Nullable<Nullable<Student>[]>;
}

export interface IQuery {
    students(): Nullable<Nullable<Student>[]> | Promise<Nullable<Nullable<Student>[]>>;
    teachers(): Nullable<Nullable<Teacher>[]> | Promise<Nullable<Nullable<Teacher>[]>>;
    studentByName(name: string): Nullable<Student> | Promise<Nullable<Student>>;
    studentsByATeacherName(name: string): Nullable<Nullable<Student>[]> | Promise<Nullable<Nullable<Student>[]>>;
}

export interface Res {
    success?: Nullable<boolean>;
    message?: Nullable<string>;
}

export interface IMutation {
    addStudent(name: string, age: number, sex: boolean): Nullable<Res> | Promise<Nullable<Res>>;
    updateStudent(id: string, name: string, age: number, sex: boolean): Nullable<Res> | Promise<Nullable<Res>>;
    deleteStudent(id: string): Nullable<Res> | Promise<Nullable<Res>>;
}

type Nullable<T> = T | null;
