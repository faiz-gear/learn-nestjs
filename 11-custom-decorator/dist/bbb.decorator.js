"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bbb = void 0;
const common_1 = require("@nestjs/common");
const aaa_decorator_1 = require("./aaa.decorator");
const aaa_guard_1 = require("./aaa.guard");
const Bbb = (path, role) => (0, common_1.applyDecorators)((0, common_1.Get)(path), (0, aaa_decorator_1.Aaa)(role), (0, common_1.UseGuards)(aaa_guard_1.AaaGuard));
exports.Bbb = Bbb;
//# sourceMappingURL=bbb.decorator.js.map