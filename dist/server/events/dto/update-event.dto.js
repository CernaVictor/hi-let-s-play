"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEventDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const event_entity_1 = require("../entities/event.entity");
class UpdateEventDto extends (0, swagger_1.PartialType)(event_entity_1.SportFieldEvent) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateEventDto = UpdateEventDto;
//# sourceMappingURL=update-event.dto.js.map