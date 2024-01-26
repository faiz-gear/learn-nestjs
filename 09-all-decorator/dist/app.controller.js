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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const aaa_filter_1 = require("./aaa.filter");
const create_bbb_dto_1 = require("./dto/create-bbb.dto");
const aaa_guard_1 = require("./aaa.guard");
const aaa_interceptor_1 = require("./aaa.interceptor");
let AppController = class AppController {
    constructor() { }
    getHello() {
        return 'hello';
    }
    bbb(id, bbbQuery) {
        console.log(typeof id, typeof bbbQuery);
        console.log(id, bbbQuery);
        return id + '' + bbbQuery;
    }
    postBbb(body) {
        console.log(body);
        return body;
    }
    ccc(header, accept) {
        console.log(accept);
        return header;
    }
    ip(ip) {
        console.log(ip);
        return ip;
    }
    session(session) {
        console.log(session);
        session.language = 'en';
        return session;
    }
    user() {
        return { name: 'faiz-gear', age: 20 };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Optional)(),
    __metadata("design:type", app_service_1.AppService)
], AppController.prototype, "appService", void 0);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseFilters)(aaa_filter_1.AaaFilter),
    (0, common_1.SetMetadata)('roles', ['admin']),
    (0, common_1.UseGuards)(aaa_guard_1.AaaGuard),
    (0, common_1.UseInterceptors)(aaa_interceptor_1.AaaInterceptor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('/bbb/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('bbbQuery', common_1.ParseBoolPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "bbb", null);
__decorate([
    (0, common_1.Post)('/bbb'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bbb_dto_1.CreateBbbDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "postBbb", null);
__decorate([
    (0, common_1.Get)('ccc'),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Headers)('accept')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "ccc", null);
__decorate([
    (0, common_1.Get)('/ip'),
    __param(0, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "ip", null);
__decorate([
    (0, common_1.Get)('/session'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "session", null);
__decorate([
    (0, common_1.Get)('user'),
    (0, common_1.Render)('user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "user", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.SetMetadata)('roles', ['user']),
    __metadata("design:paramtypes", [])
], AppController);
//# sourceMappingURL=app.controller.js.map