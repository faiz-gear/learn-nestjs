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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AaaInterceptor = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let AaaInterceptor = class AaaInterceptor {
    intercept(context, next) {
        console.log('interceptor');
        console.log('controller roles', this.reflector.get('roles', context.getClass()));
        console.log('handler roles', this.reflector.get('roles', context.getHandler()));
        console.log('reflector get all', this.reflector.getAll('roles', [
            context.getHandler(),
            context.getClass(),
        ]));
        console.log('reflector get all and merge', this.reflector.getAllAndMerge('roles', [
            context.getHandler(),
            context.getClass(),
        ]));
        console.log('reflector get all and override', this.reflector.getAllAndOverride('roles', [
            context.getHandler(),
            context.getClass(),
        ]));
        return next.handle();
    }
};
exports.AaaInterceptor = AaaInterceptor;
__decorate([
    (0, common_1.Inject)(core_1.Reflector),
    __metadata("design:type", core_1.Reflector)
], AaaInterceptor.prototype, "reflector", void 0);
exports.AaaInterceptor = AaaInterceptor = __decorate([
    (0, common_1.Injectable)()
], AaaInterceptor);
//# sourceMappingURL=aaa.interceptor.js.map