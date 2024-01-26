"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AaaFilter = void 0;
const common_1 = require("@nestjs/common");
const AaaException_1 = require("./AaaException");
let AaaFilter = class AaaFilter {
    catch(exception, host) {
        console.log('🚀 ~ file: aaa.filter.ts ~ line 7 ~ AaaFilter ~ exception', exception, host);
        if (host.getType() === 'http') {
            const ctx = host.switchToHttp();
            const res = ctx.getResponse();
            const req = ctx.getRequest();
            res.status(500).json({
                aaa: exception.aaa,
                bbb: exception.bbb,
            });
        }
        else if (host.getType() === 'ws') {
            const ctx = host.switchToWs();
            console.log(ctx);
        }
        else if (host.getType() === 'rpc') {
            const ctx = host.switchToRpc();
            console.log(ctx);
        }
    }
};
exports.AaaFilter = AaaFilter;
exports.AaaFilter = AaaFilter = __decorate([
    (0, common_1.Catch)(AaaException_1.AaaException)
], AaaFilter);
//# sourceMappingURL=aaa.filter.js.map