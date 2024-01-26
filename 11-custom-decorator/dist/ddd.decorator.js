"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ddd = void 0;
const common_1 = require("@nestjs/common");
const aaa_guard_1 = require("./aaa.guard");
const Ddd = () => (0, common_1.applyDecorators)((0, common_1.Controller)('api'), (0, common_1.SetMetadata)('ddd', 'ddd'), (0, common_1.UseGuards)(aaa_guard_1.AaaGuard));
exports.Ddd = Ddd;
//# sourceMappingURL=ddd.decorator.js.map