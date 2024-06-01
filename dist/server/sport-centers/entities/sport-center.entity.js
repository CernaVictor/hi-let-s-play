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
exports.SportCenter = void 0;
const openapi = require("@nestjs/swagger");
const photo_entity_1 = require("../../entities/photo.entity");
const event_entity_1 = require("../../events/entities/event.entity");
const sport_field_entity_1 = require("../../sport-fields/entities/sport-field.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let SportCenter = class SportCenter {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, phoneNumber: { required: true, type: () => String }, country: { required: true, type: () => String }, city: { required: true, type: () => String }, address: { required: true, type: () => String }, latitude: { required: true, type: () => Number }, longitude: { required: true, type: () => Number }, sportFields: { required: true, type: () => [require("../../sport-fields/entities/sport-field.entity").SportField] }, owner: { required: true, type: () => require("../../users/entities/user.entity").User }, offBusinessHours: { required: true, type: () => require("../../events/entities/event.entity").OffBusinessHours }, imageGallery: { required: true, type: () => [require("../../entities/photo.entity").SportCenterPhoto] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SportCenter.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], SportCenter.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], SportCenter.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], SportCenter.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], SportCenter.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], SportCenter.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], SportCenter.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'float' }),
    __metadata("design:type", Number)
], SportCenter.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'float' }),
    __metadata("design:type", Number)
], SportCenter.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sport_field_entity_1.SportField, (sf) => sf.sportCenter),
    __metadata("design:type", Array)
], SportCenter.prototype, "sportFields", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.sportCenters),
    __metadata("design:type", user_entity_1.User)
], SportCenter.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => event_entity_1.OffBusinessHours, (bh) => bh.sportCenter, { cascade: true }),
    __metadata("design:type", event_entity_1.OffBusinessHours)
], SportCenter.prototype, "offBusinessHours", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => photo_entity_1.SportCenterPhoto, (scp) => scp.sportCenter, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], SportCenter.prototype, "imageGallery", void 0);
SportCenter = __decorate([
    (0, typeorm_1.Entity)()
], SportCenter);
exports.SportCenter = SportCenter;
//# sourceMappingURL=sport-center.entity.js.map