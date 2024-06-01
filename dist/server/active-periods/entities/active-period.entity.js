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
exports.ActivePeriod = void 0;
const openapi = require("@nestjs/swagger");
const event_entity_1 = require("../../events/entities/event.entity");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let ActivePeriod = class ActivePeriod {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, event: { required: true, type: () => require("../../events/entities/event.entity").Event }, validFrom: { required: true, type: () => String }, validThrough: { required: true, type: () => String }, startTime: { required: true, type: () => String }, duration: { required: true, type: () => Number }, dayOfTheWeek: { required: true, type: () => Object } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ActivePeriod.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => event_entity_1.Event, (event) => event.activePeriods, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", event_entity_1.Event)
], ActivePeriod.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", String)
], ActivePeriod.prototype, "validFrom", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", String)
], ActivePeriod.prototype, "validThrough", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], ActivePeriod.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, class_validator_1.IsDivisibleBy)(30),
    __metadata("design:type", Number)
], ActivePeriod.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(6),
    __metadata("design:type", Number)
], ActivePeriod.prototype, "dayOfTheWeek", void 0);
ActivePeriod = __decorate([
    (0, typeorm_1.Entity)()
], ActivePeriod);
exports.ActivePeriod = ActivePeriod;
//# sourceMappingURL=active-period.entity.js.map