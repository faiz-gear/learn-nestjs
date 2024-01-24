"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AaaModule = void 0;
const common_1 = require("@nestjs/common");
const aaa_service_1 = require("./aaa.service");
const aaa_controller_1 = require("./aaa.controller");
let AaaModule = exports.AaaModule = class AaaModule {
};
exports.AaaModule = AaaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        controllers: [aaa_controller_1.AaaController],
        providers: [aaa_service_1.AaaService],
        exports: [aaa_service_1.AaaService],
    })
], AaaModule);
//# sourceMappingURL=aaa.module.js.map