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
exports.SportField = void 0;
const openapi = require("@nestjs/swagger");
const photo_entity_1 = require("../../entities/photo.entity");
const event_entity_1 = require("../../events/entities/event.entity");
const sport_center_entity_1 = require("../../sport-centers/entities/sport-center.entity");
const sport_entity_1 = require("../../sports/entities/sport.entity");
const typeorm_1 = require("typeorm");
let SportField = class SportField {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, isHeated: { required: true, type: () => Boolean }, isIluminated: { required: true, type: () => Boolean }, isIndoor: { required: true, type: () => Boolean }, isCovered: { required: true, type: () => Boolean }, events: { required: true, type: () => [require("../../events/entities/event.entity").SportFieldEvent] }, sportCenter: { required: true, type: () => require("../../sport-centers/entities/sport-center.entity").SportCenter }, imageGallery: { required: true, type: () => [require("../../entities/photo.entity").SportFieldPhoto] }, sport: { required: true, type: () => require("../../sports/entities/sport.entity").Sport } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SportField.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SportField.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SportField.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], SportField.prototype, "isHeated", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], SportField.prototype, "isIluminated", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], SportField.prototype, "isIndoor", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], SportField.prototype, "isCovered", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => event_entity_1.SportFieldEvent, (ev) => ev.sportField),
    __metadata("design:type", Array)
], SportField.prototype, "events", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sport_center_entity_1.SportCenter, (sc) => sc.sportFields, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", sport_center_entity_1.SportCenter)
], SportField.prototype, "sportCenter", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => photo_entity_1.SportFieldPhoto, (sf) => sf.sportField, { cascade: true }),
    __metadata("design:type", Array)
], SportField.prototype, "imageGallery", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sport_entity_1.Sport, (sport) => sport.sportField),
    __metadata("design:type", sport_entity_1.Sport)
], SportField.prototype, "sport", void 0);
SportField = __decorate([
    (0, typeorm_1.Entity)()
], SportField);
exports.SportField = SportField;
//# sourceMappingURL=sport-field.entity.js.map