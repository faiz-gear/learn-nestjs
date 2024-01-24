"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAaaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_aaa_dto_1 = require("./create-aaa.dto");
class UpdateAaaDto extends (0, mapped_types_1.PartialType)(create_aaa_dto_1.CreateAaaDto) {
}
exports.UpdateAaaDto = UpdateAaaDto;
//# sourceMappingURL=update-aaa.dto.js.map