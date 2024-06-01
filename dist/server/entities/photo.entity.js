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
exports.SportFieldPhoto = exports.SportCenterPhoto = exports.Photo = void 0;
const openapi = require("@nestjs/swagger");
const sport_center_entity_1 = require("../sport-centers/entities/sport-center.entity");
const sport_field_entity_1 = require("../sport-fields/entities/sport-field.entity");
const typeorm_1 = require("typeorm");
let Photo = class Photo {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, url: { required: true, type: () => String } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Photo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Photo.prototype, "url", void 0);
Photo = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.TableInheritance)({ column: { type: 'varchar', name: 'type' } })
], Photo);
exports.Photo = Photo;
let SportCenterPhoto = class SportCenterPhoto extends Photo {
    static _OPENAPI_METADATA_FACTORY() {
        return { sportCenter: { required: true, type: () => require("../sport-centers/entities/sport-center.entity").SportCenter } };
    }
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => sport_center_entity_1.SportCenter, (sc) => sc.imageGallery, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", sport_center_entity_1.SportCenter)
], SportCenterPhoto.prototype, "sportCenter", void 0);
SportCenterPhoto = __decorate([
    (0, typeorm_1.ChildEntity)()
], SportCenterPhoto);
exports.SportCenterPhoto = SportCenterPhoto;
let SportFieldPhoto = class SportFieldPhoto extends Photo {
    static _OPENAPI_METADATA_FACTORY() {
        return { sportField: { required: true, type: () => require("../sport-fields/entities/sport-field.entity").SportField } };
    }
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => sport_field_entity_1.SportField, (sf) => sf.imageGallery, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", sport_field_entity_1.SportField)
], SportFieldPhoto.prototype, "sportField", void 0);
SportFieldPhoto = __decorate([
    (0, typeorm_1.ChildEntity)()
], SportFieldPhoto);
exports.SportFieldPhoto = SportFieldPhoto;
//# sourceMappingURL=photo.entity.js.map