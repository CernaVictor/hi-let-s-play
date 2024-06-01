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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivePeriodsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const active_periods_service_1 = require("./active-periods.service");
const create_active_period_dto_1 = require("./dto/create-active-period.dto");
const update_active_period_dto_1 = require("./dto/update-active-period.dto");
let ActivePeriodsController = class ActivePeriodsController {
    constructor(activePeriodsService) {
        this.activePeriodsService = activePeriodsService;
    }
    create(createActivePeriodDto) {
        return this.activePeriodsService.create(createActivePeriodDto);
    }
    findAll() {
        return this.activePeriodsService.findAll();
    }
    findOne(id) {
        return this.activePeriodsService.findOne(+id);
    }
    update(id, updateActivePeriodDto) {
        return this.activePeriodsService.update(+id, updateActivePeriodDto);
    }
    remove(id) {
        return this.activePeriodsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_active_period_dto_1.CreateActivePeriodDto]),
    __metadata("design:returntype", void 0)
], ActivePeriodsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ActivePeriodsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ActivePeriodsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_active_period_dto_1.UpdateActivePeriodDto]),
    __metadata("design:returntype", void 0)
], ActivePeriodsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ActivePeriodsController.prototype, "remove", null);
ActivePeriodsController = __decorate([
    (0, common_1.Controller)('active-periods'),
    (0, swagger_1.ApiTags)('active-periods'),
    __metadata("design:paramtypes", [active_periods_service_1.ActivePeriodsService])
], ActivePeriodsController);
exports.ActivePeriodsController = ActivePeriodsController;
//# sourceMappingURL=active-periods.controller.js.map