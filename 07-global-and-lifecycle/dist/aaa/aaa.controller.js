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
exports.AaaController = void 0;
const common_1 = require("@nestjs/common");
const aaa_service_1 = require("./aaa.service");
const create_aaa_dto_1 = require("./dto/create-aaa.dto");
const update_aaa_dto_1 = require("./dto/update-aaa.dto");
let AaaController = exports.AaaController = class AaaController {
    constructor(aaaService) {
        this.aaaService = aaaService;
    }
    create(createAaaDto) {
        return this.aaaService.create(createAaaDto);
    }
    findAll() {
        return this.aaaService.findAll();
    }
    findOne(id) {
        return this.aaaService.findOne(+id);
    }
    update(id, updateAaaDto) {
        return this.aaaService.update(+id, updateAaaDto);
    }
    remove(id) {
        return this.aaaService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_aaa_dto_1.CreateAaaDto]),
    __metadata("design:returntype", void 0)
], AaaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AaaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AaaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_aaa_dto_1.UpdateAaaDto]),
    __metadata("design:returntype", void 0)
], AaaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AaaController.prototype, "remove", null);
exports.AaaController = AaaController = __decorate([
    (0, common_1.Controller)('aaa'),
    __metadata("design:paramtypes", [aaa_service_1.AaaService])
], AaaController);
//# sourceMappingURL=aaa.controller.js.map