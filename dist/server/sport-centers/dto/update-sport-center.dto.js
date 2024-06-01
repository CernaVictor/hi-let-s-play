"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSportCenterDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_sport_center_dto_1 = require("./create-sport-center.dto");
const class_transformer_1 = require("class-transformer");
class UpdateSportCenterDto extends (0, swagger_1.PartialType)(create_sport_center_dto_1.CreateSportCenterDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return { offBusinessHours: { required: true, type: () => Object }, imageGallery: { required: true, type: () => [Object] } };
    }
}
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => JSON.parse(value)),
    __metadata("design:type", Object)
], UpdateSportCenterDto.prototype, "offBusinessHours", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => JSON.parse(value)),
    __metadata("design:type", Array)
], UpdateSportCenterDto.prototype, "imageGallery", void 0);
exports.UpdateSportCenterDto = UpdateSportCenterDto;
//# sourceMappingURL=update-sport-center.dto.js.map