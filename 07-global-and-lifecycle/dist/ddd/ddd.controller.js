"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DddController = void 0;
const common_1 = require("@nestjs/common");
const ddd_service_1 = require("./ddd.service");
const create_ddd_dto_1 = require("./dto/create-ddd.dto");
const update_ddd_dto_1 = require("./dto/update-ddd.dto");
let DddController = exports.DddController = class DddController {
    constructor(dddService) {
        this.dddService = dddService;
    }
    onApplicationShutdown(signal) {
        console.log('ddd controller onApplicationShutdown');
    }
    beforeApplicationShutdown(signal) {
        console.log('ddd controller beforeApplicationShutdown');
    }
    onModuleDestroy() {
        console.log('ddd controller onModuleDestroy');
    }
    onApplicationBootstrap() {
        console.log('ddd controller onApplicationBootstrap');
    }
    onModuleInit() {
        console.log('ddd controller onModuleInit');
    }
    create(createDddDto) {
        return this.dddService.create(createDddDto);
    }
    findAll() {
        return this.dddService.findAll();
    }
    findOne(id) {
        return this.dddService.findOne(+id);
    }
    update(id, updateDddDto) {
        return this.dddService.update(+id, updateDddDto);
    }
    remove(id) {
        return this.dddService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ddd_dto_1.CreateDddDto]),
    __metadata("design:returntype", void 0)
], DddController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DddController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DddController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ddd_dto_1.UpdateDddDto]),
    __metadata("design:returntype", void 0)
], DddController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DddController.prototype, "remove", null);
exports.DddController = DddController = __decorate([
    (0, common_1.Controller)('ddd'),
    __metadata("design:paramtypes", [ddd_service_1.DddService])
], DddController);
//# sourceMappingURL=ddd.controller.js.map