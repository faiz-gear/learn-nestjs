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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DddController = void 0;
const common_1 = require("@nestjs/common");
const express_1 = require("express");
let DddController = class DddController {
    hello(host) {
        console.log('🚀 ~ file: ddd.controller.ts ~ line 10 ~ DddController ~ hello ~ host', host);
        return host;
    }
    ccc(req) {
        console.log('🚀 ~ file: ddd.controller.ts ~ line 20 ~ DddController ~ ccc ~ req', req.url, req.hostname);
        return 'ccc';
    }
    eee(res) {
        console.log('🚀 ~ file: ddd.controller.ts ~ line 31 ~ DddController ~ eee ~ res', res);
        return 'eee';
    }
    fff(next) {
        console.log('fff handler1');
        next();
        return 'fff';
    }
    fff2() {
        console.log('fff handler2');
        return 'fff2';
    }
    ggg() {
        return 'ggg';
    }
    hhh() {
        return 'ggg';
    }
    iii() {
        return {
            url: 'https://www.baidu.com',
            statusCode: 302,
        };
    }
};
exports.DddController = DddController;
__decorate([
    (0, common_1.Get)('bbb'),
    __param(0, (0, common_1.HostParam)('host')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DddController.prototype, "hello", null);
__decorate([
    (0, common_1.Get)('ccc'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], DddController.prototype, "ccc", null);
__decorate([
    (0, common_1.Get)('eee'),
    __param(0, (0, common_1.Res)({
        passthrough: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], DddController.prototype, "eee", null);
__decorate([
    (0, common_1.Get)('fff'),
    __param(0, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], DddController.prototype, "fff", null);
__decorate([
    (0, common_1.Get)('fff'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DddController.prototype, "fff2", null);
__decorate([
    (0, common_1.Get)('ggg'),
    (0, common_1.HttpCode)(222),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DddController.prototype, "ggg", null);
__decorate([
    (0, common_1.Get)('hhh'),
    (0, common_1.Header)('age', '20'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DddController.prototype, "hhh", null);
__decorate([
    (0, common_1.Get)('iii'),
    (0, common_1.Redirect)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DddController.prototype, "iii", null);
exports.DddController = DddController = __decorate([
    (0, common_1.Controller)({
        host: ':host.0.0.1',
        path: '/ddd',
    })
], DddController);
//# sourceMappingURL=ddd.controller.js.map