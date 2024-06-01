"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsModule = void 0;
const common_1 = require("@nestjs/common");
const events_service_1 = require("./events.service");
const events_controller_1 = require("./events.controller");
const typeorm_1 = require("@nestjs/typeorm");
const event_entity_1 = require("./entities/event.entity");
const active_period_entity_1 = require("../active-periods/entities/active-period.entity");
const sport_center_entity_1 = require("../sport-centers/entities/sport-center.entity");
let EventsModule = class EventsModule {
};
EventsModule = __decorate([
    (0, common_1.Module)({
        controllers: [events_controller_1.EventsController],
        providers: [events_service_1.EventsService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                sport_center_entity_1.SportCenter,
                event_entity_1.Event,
                active_period_entity_1.ActivePeriod,
                event_entity_1.OffBusinessHours,
                event_entity_1.SportFieldEvent,
            ]),
        ],
        exports: [events_service_1.EventsService],
    })
], EventsModule);
exports.EventsModule = EventsModule;
//# sourceMappingURL=events.module.js.map