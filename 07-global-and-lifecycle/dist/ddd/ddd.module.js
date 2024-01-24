"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DddModule = void 0;
const common_1 = require("@nestjs/common");
const ddd_service_1 = require("./ddd.service");
const ddd_controller_1 = require("./ddd.controller");
let DddModule = exports.DddModule = class DddModule {
    onApplicationShutdown(signal) {
        console.log('DddModule onApplicationShutdown');
    }
    beforeApplicationShutdown(signal) {
        console.log('DddModule beforeApplicationShutdown');
    }
    onModuleDestroy() {
        console.log('DddModule onModuleDestroy');
    }
    onApplicationBootstrap() {
        console.log('DddModule onApplicationBootstrap');
    }
    onModuleInit() {
        console.log('DddModule onModuleInit');
    }
};
exports.DddModule = DddModule = __decorate([
    (0, common_1.Module)({
        controllers: [ddd_controller_1.DddController],
        providers: [ddd_service_1.DddService],
    })
], DddModule);
//# sourceMappingURL=ddd.module.js.map