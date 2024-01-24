"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCccDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_ccc_dto_1 = require("./create-ccc.dto");
class UpdateCccDto extends (0, mapped_types_1.PartialType)(create_ccc_dto_1.CreateCccDto) {
}
exports.UpdateCccDto = UpdateCccDto;
//# sourceMappingURL=update-ccc.dto.js.map