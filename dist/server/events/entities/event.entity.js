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
exports.SportFieldEvent = exports.OffBusinessHours = exports.Event = void 0;
const openapi = require("@nestjs/swagger");
const active_period_entity_1 = require("../../active-periods/entities/active-period.entity");
const sport_center_entity_1 = require("../../sport-centers/entities/sport-center.entity");
const sport_field_entity_1 = require("../../sport-fields/entities/sport-field.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let Event = class Event {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, creator: { required: true, type: () => require("../../users/entities/user.entity").User }, activePeriods: { required: true, type: () => [require("../../active-periods/entities/active-period.entity").ActivePeriod] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Event.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.events, {
        onDelete: 'CASCADE',
        eager: true,
    }),
    __metadata("design:type", user_entity_1.User)
], Event.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => active_period_entity_1.ActivePeriod, (ap) => ap.event, {
        eager: true,
        cascade: true,
    }),
    __metadata("design:type", Array)
], Event.prototype, "activePeriods", void 0);
Event = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.TableInheritance)({ column: { type: 'varchar', name: 'type' } })
], Event);
exports.Event = Event;
let OffBusinessHours = class OffBusinessHours extends Event {
    static _OPENAPI_METADATA_FACTORY() {
        return { sportCenter: { required: true, type: () => require("../../sport-centers/entities/sport-center.entity").SportCenter } };
    }
};
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToOne)(() => sport_center_entity_1.SportCenter, (sc) => sc.offBusinessHours, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", sport_center_entity_1.SportCenter)
], OffBusinessHours.prototype, "sportCenter", void 0);
OffBusinessHours = __decorate([
    (0, typeorm_1.ChildEntity)()
], OffBusinessHours);
exports.OffBusinessHours = OffBusinessHours;
let SportFieldEvent = class SportFieldEvent extends Event {
    static _OPENAPI_METADATA_FACTORY() {
        return { sportField: { required: true, type: () => require("../../sport-fields/entities/sport-field.entity").SportField } };
    }
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => sport_field_entity_1.SportField, (sf) => sf.events, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", sport_field_entity_1.SportField)
], SportFieldEvent.prototype, "sportField", void 0);
SportFieldEvent = __decorate([
    (0, typeorm_1.ChildEntity)()
], SportFieldEvent);
exports.SportFieldEvent = SportFieldEvent;
//# sourceMappingURL=event.entity.js.map