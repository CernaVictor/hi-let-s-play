"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SportFieldsModule = void 0;
const common_1 = require("@nestjs/common");
const sport_fields_service_1 = require("./sport-fields.service");
const sport_fields_controller_1 = require("./sport-fields.controller");
const users_module_1 = require("../users/users.module");
const sport_field_entity_1 = require("./entities/sport-field.entity");
const typeorm_1 = require("@nestjs/typeorm");
const photo_entity_1 = require("../entities/photo.entity");
const sport_entity_1 = require("../sports/entities/sport.entity");
let SportFieldsModule = class SportFieldsModule {
};
SportFieldsModule = __decorate([
    (0, common_1.Module)({
        controllers: [sport_fields_controller_1.SportFieldsController],
        providers: [sport_fields_service_1.SportFieldsService],
        imports: [
            users_module_1.UsersModule,
            typeorm_1.TypeOrmModule.forFeature([sport_field_entity_1.SportField, photo_entity_1.SportFieldPhoto, sport_entity_1.Sport]),
        ],
    })
], SportFieldsModule);
exports.SportFieldsModule = SportFieldsModule;
//# sourceMappingURL=sport-fields.module.js.map