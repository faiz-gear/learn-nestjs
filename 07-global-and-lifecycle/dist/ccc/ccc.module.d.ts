import { BeforeApplicationShutdown, OnApplicationBootstrap, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
export declare class CccModule implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown {
    private moduleRef;
    constructor(moduleRef: ModuleRef);
    onApplicationShutdown(signal?: string): void;
    beforeApplicationShutdown(signal?: string): void;
    onModuleDestroy(): void;
    onApplicationBootstrap(): void;
    onModuleInit(): void;
}
