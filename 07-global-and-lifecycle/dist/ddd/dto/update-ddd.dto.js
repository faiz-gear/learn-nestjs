"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDddDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_ddd_dto_1 = require("./create-ddd.dto");
class UpdateDddDto extends (0, mapped_types_1.PartialType)(create_ddd_dto_1.CreateDddDto) {
}
exports.UpdateDddDto = UpdateDddDto;
//# sourceMappingURL=update-ddd.dto.js.map