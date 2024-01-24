import { OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown } from '@nestjs/common';
import { CccService } from './ccc.service';
import { CreateCccDto } from './dto/create-ccc.dto';
import { UpdateCccDto } from './dto/update-ccc.dto';
export declare class CccController implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown {
    private readonly cccService;
    constructor(cccService: CccService);
    onApplicationShutdown(signal?: string): void;
    beforeApplicationShutdown(signal?: string): void;
    onModuleDestroy(): void;
    onApplicationBootstrap(): void;
    onModuleInit(): void;
    create(createCccDto: CreateCccDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCccDto: UpdateCccDto): string;
    remove(id: string): string;
}
