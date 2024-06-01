"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSportFieldDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const sport_field_entity_1 = require("../entities/sport-field.entity");
class UpdateSportFieldDto extends (0, swagger_1.PartialType)(sport_field_entity_1.SportField) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateSportFieldDto = UpdateSportFieldDto;
//# sourceMappingURL=update-sport-field.dto.js.map