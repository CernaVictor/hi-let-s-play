"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateActivePeriodDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_active_period_dto_1 = require("./create-active-period.dto");
class UpdateActivePeriodDto extends (0, swagger_1.PartialType)(create_active_period_dto_1.CreateActivePeriodDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateActivePeriodDto = UpdateActivePeriodDto;
//# sourceMappingURL=update-active-period.dto.js.map