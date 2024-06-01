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
exports.SportFieldsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const sport_fields_service_1 = require("./sport-fields.service");
const create_sport_field_dto_1 = require("./dto/create-sport-field.dto");
const update_sport_field_dto_1 = require("./dto/update-sport-field.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
let SportFieldsController = class SportFieldsController {
    constructor(sportFieldsService) {
        this.sportFieldsService = sportFieldsService;
    }
    create(createSportFieldDto) {
        return this.sportFieldsService.create(createSportFieldDto);
    }
    findAll(req, sportCenterId) {
        var _a, _b;
        const token = (_b = (_a = req.token) === null || _a === void 0 ? void 0 : _a.sub) !== null && _b !== void 0 ? _b : '';
        return this.sportFieldsService.findAll(sportCenterId, token);
    }
    findOne(id) {
        return this.sportFieldsService.findOne(id);
    }
    update(id, updateSportFieldDto) {
        return this.sportFieldsService.update(id, updateSportFieldDto);
    }
    remove(id, req) {
        var _a, _b;
        if (!((_a = req.token) === null || _a === void 0 ? void 0 : _a.sub))
            return null;
        return this.sportFieldsService.remove(id, (_b = req.token) === null || _b === void 0 ? void 0 : _b.sub);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 201, type: require("./entities/sport-field.entity").SportField }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sport_field_dto_1.CreateSportFieldDto]),
    __metadata("design:returntype", void 0)
], SportFieldsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./entities/sport-field.entity").SportField] }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('sportCenterId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SportFieldsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SportFieldsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sport_field_dto_1.UpdateSportFieldDto]),
    __metadata("design:returntype", void 0)
], SportFieldsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SportFieldsController.prototype, "remove", null);
SportFieldsController = __decorate([
    (0, common_1.Controller)('sport-fields'),
    (0, swagger_1.ApiTags)('sport-fields'),
    __metadata("design:paramtypes", [sport_fields_service_1.SportFieldsService])
], SportFieldsController);
exports.SportFieldsController = SportFieldsController;
//# sourceMappingURL=sport-fields.controller.js.map