"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SportCentersModule = void 0;
const common_1 = require("@nestjs/common");
const sport_centers_service_1 = require("./sport-centers.service");
const sport_centers_controller_1 = require("./sport-centers.controller");
const sport_center_entity_1 = require("./entities/sport-center.entity");
const typeorm_1 = require("@nestjs/typeorm");
const photo_entity_1 = require("../entities/photo.entity");
const event_entity_1 = require("../events/entities/event.entity");
const file_upload_module_1 = require("../file-upload/file-upload.module");
let SportCentersModule = class SportCentersModule {
};
SportCentersModule = __decorate([
    (0, common_1.Module)({
        controllers: [sport_centers_controller_1.SportCentersController],
        providers: [sport_centers_service_1.SportCentersService],
        imports: [
            file_upload_module_1.FileUploadModule,
            typeorm_1.TypeOrmModule.forFeature([
                sport_center_entity_1.SportCenter,
                photo_entity_1.Photo,
                photo_entity_1.SportCenterPhoto,
                event_entity_1.OffBusinessHours,
            ]),
        ],
        exports: [sport_centers_service_1.SportCentersService],
    })
], SportCentersModule);
exports.SportCentersModule = SportCentersModule;
//# sourceMappingURL=sport-centers.module.js.map