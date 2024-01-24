"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CccService = void 0;
const common_1 = require("@nestjs/common");
let CccService = exports.CccService = class CccService {
    onApplicationShutdown(signal) {
        console.log('CccService onApplicationShutdown');
    }
    beforeApplicationShutdown(signal) {
        console.log('CccService beforeApplicationShutdown');
    }
    onModuleDestroy() {
        console.log('CccService onModuleDestroy');
    }
    onApplicationBootstrap() {
        console.log('CccService onApplicationBootstrap');
    }
    onModuleInit() {
        console.log('CccService onModuleInit');
    }
    create(createCccDto) {
        return 'This action adds a new ccc';
    }
    findAll() {
        return `This action returns all ccc`;
    }
    findOne(id) {
        return `This action returns a #${id} ccc`;
    }
    update(id, updateCccDto) {
        return `This action updates a #${id} ccc`;
    }
    remove(id) {
        return `This action removes a #${id} ccc`;
    }
};
exports.CccService = CccService = __decorate([
    (0, common_1.Injectable)()
], CccService);
//# sourceMappingURL=ccc.service.js.map