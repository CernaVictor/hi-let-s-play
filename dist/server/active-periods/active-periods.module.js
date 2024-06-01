"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivePeriodsModule = void 0;
const common_1 = require("@nestjs/common");
const active_periods_service_1 = require("./active-periods.service");
const active_periods_controller_1 = require("./active-periods.controller");
const active_period_entity_1 = require("./entities/active-period.entity");
const typeorm_1 = require("@nestjs/typeorm");
let ActivePeriodsModule = class ActivePeriodsModule {
};
ActivePeriodsModule = __decorate([
    (0, common_1.Module)({
        controllers: [active_periods_controller_1.ActivePeriodsController],
        providers: [active_periods_service_1.ActivePeriodsService],
        imports: [typeorm_1.TypeOrmModule.forFeature([active_period_entity_1.ActivePeriod])],
    })
], ActivePeriodsModule);
exports.ActivePeriodsModule = ActivePeriodsModule;
//# sourceMappingURL=active-periods.module.js.map