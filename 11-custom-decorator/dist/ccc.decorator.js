"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyQuery = exports.MyHeader = exports.Ccc = void 0;
const common_1 = require("@nestjs/common");
exports.Ccc = (0, common_1.createParamDecorator)((data, context) => {
    return 'ccc';
});
exports.MyHeader = (0, common_1.createParamDecorator)((key, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return key ? request.headers[key.toLowerCase()] : request.headers;
});
exports.MyQuery = (0, common_1.createParamDecorator)((key, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return key ? request.query[key] : request.query;
});
//# sourceMappingURL=ccc.decorator.js.map