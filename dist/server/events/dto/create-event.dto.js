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
exports.CreateEventDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateEventDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { sportFieldId: { required: true, type: () => String }, startTime: { required: true, type: () => String }, duration: { required: true, type: () => Number }, validFrom: { required: true, type: () => String }, validThrough: { required: true, type: () => String }, bookerName: { required: true, type: () => String }, dayOfTheWeek: { required: true, type: () => Object } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'test',
    }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "sportFieldId", void 0);
__decorate([
    (0, class_validator_1.IsMilitaryTime)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "startTime", void 0);
__decorate([
    (0, class_validator_1.IsDivisibleBy)(30),
    __metadata("design:type", Number)
], CreateEventDto.prototype, "duration", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "validFrom", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "validThrough", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'will be replaced by user',
    }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "bookerName", void 0);
__decorate([
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(6),
    __metadata("design:type", Number)
], CreateEventDto.prototype, "dayOfTheWeek", void 0);
exports.CreateEventDto = CreateEventDto;
//# sourceMappingURL=create-event.dto.js.map