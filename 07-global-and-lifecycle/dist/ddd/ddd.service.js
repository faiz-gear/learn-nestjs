"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DddService = void 0;
const common_1 = require("@nestjs/common");
let DddService = exports.DddService = class DddService {
    onApplicationShutdown(signal) {
        console.log('DddService onApplicationShutdown');
    }
    beforeApplicationShutdown(signal) {
        console.log('DddService beforeApplicationShutdown');
    }
    onModuleDestroy() {
        console.log('DddService onModuleDestroy');
    }
    onApplicationBootstrap() {
        console.log('DddService onApplicationBootstrap');
    }
    onModuleInit() {
        console.log('DddService onModuleInit');
    }
    create(createDddDto) {
        return 'This action adds a new ddd';
    }
    findAll() {
        return `This action returns all ddd`;
    }
    findOne(id) {
        return `This action returns a #${id} ddd`;
    }
    update(id, updateDddDto) {
        return `This action updates a #${id} ddd`;
    }
    remove(id) {
        return `This action removes a #${id} ddd`;
    }
};
exports.DddService = DddService = __decorate([
    (0, common_1.Injectable)()
], DddService);
//# sourceMappingURL=ddd.service.js.map