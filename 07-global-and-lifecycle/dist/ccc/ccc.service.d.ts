import { BeforeApplicationShutdown, OnApplicationBootstrap, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { CreateCccDto } from './dto/create-ccc.dto';
import { UpdateCccDto } from './dto/update-ccc.dto';
export declare class CccService implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown {
    onApplicationShutdown(signal?: string): void;
    beforeApplicationShutdown(signal?: string): void;
    onModuleDestroy(): void;
    onApplicationBootstrap(): void;
    onModuleInit(): void;
    create(createCccDto: CreateCccDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCccDto: UpdateCccDto): string;
    remove(id: number): string;
}
