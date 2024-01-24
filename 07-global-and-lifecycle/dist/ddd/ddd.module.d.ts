import { BeforeApplicationShutdown, OnApplicationBootstrap, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
export declare class DddModule implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown {
    onApplicationShutdown(signal?: string): void;
    beforeApplicationShutdown(signal?: string): void;
    onModuleDestroy(): void;
    onApplicationBootstrap(): void;
    onModuleInit(): void;
}
