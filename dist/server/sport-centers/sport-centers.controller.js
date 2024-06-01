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
exports.SportCentersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const sport_centers_service_1 = require("./sport-centers.service");
const create_sport_center_dto_1 = require("./dto/create-sport-center.dto");
const update_sport_center_dto_1 = require("./dto/update-sport-center.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
let SportCentersController = class SportCentersController {
    constructor(sportCentersService) {
        this.sportCentersService = sportCentersService;
    }
    create(createSportCenterDto, req) {
        var _a, _b;
        const userId = (_b = (_a = req.token) === null || _a === void 0 ? void 0 : _a.sub) !== null && _b !== void 0 ? _b : '';
        return this.sportCentersService.create(createSportCenterDto, userId);
    }
    findAll(req) {
        var _a, _b;
        const userId = (_b = (_a = req.token) === null || _a === void 0 ? void 0 : _a.sub) !== null && _b !== void 0 ? _b : '';
        return this.sportCentersService.findAll(userId);
    }
    getSportCenterStatistics(req, dateFrom, dateTo) {
        var _a, _b;
        const userId = (_b = (_a = req.token) === null || _a === void 0 ? void 0 : _a.sub) !== null && _b !== void 0 ? _b : '';
        return this.sportCentersService.getSportCenterStatistics(userId, dateFrom, dateTo);
    }
    findOne(id, fields) {
        return this.sportCentersService.findOne(id, fields);
    }
    update(id, updateSportCenterDto, files, req) {
        var _a, _b;
        if (!((_a = req.token) === null || _a === void 0 ? void 0 : _a.sub))
            return null;
        return this.sportCentersService.update(id, updateSportCenterDto, files, (_b = req.token) === null || _b === void 0 ? void 0 : _b.sub);
    }
    remove(id, req) {
        var _a, _b;
        if (!((_a = req.token) === null || _a === void 0 ? void 0 : _a.sub))
            return null;
        return this.sportCentersService.remove(id, (_b = req.token) === null || _b === void 0 ? void 0 : _b.sub);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 201, type: require("./entities/sport-center.entity").SportCenter }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sport_center_dto_1.CreateSportCenterDto, Object]),
    __metadata("design:returntype", void 0)
], SportCentersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: [require("./entities/sport-center.entity").SportCenter] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SportCentersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('dateFrom')),
    __param(2, (0, common_1.Query)('dateTo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], SportCentersController.prototype, "getSportCenterStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('fields')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", void 0)
], SportCentersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sport_center_dto_1.UpdateSportCenterDto, Array, Object]),
    __metadata("design:returntype", void 0)
], SportCentersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SportCentersController.prototype, "remove", null);
SportCentersController = __decorate([
    (0, swagger_1.ApiTags)('sport-centers'),
    (0, common_1.Controller)('sport-centers'),
    __metadata("design:paramtypes", [sport_centers_service_1.SportCentersService])
], SportCentersController);
exports.SportCentersController = SportCentersController;
//# sourceMappingURL=sport-centers.controller.js.map