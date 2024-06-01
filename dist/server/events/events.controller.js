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
exports.EventsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const events_service_1 = require("./events.service");
const create_event_dto_1 = require("./dto/create-event.dto");
const update_event_dto_1 = require("./dto/update-event.dto");
const swagger_1 = require("@nestjs/swagger");
const cancel_event_for_date_dto_1 = require("./dto/cancel-event-for-date.dto");
const class_transformer_1 = require("class-transformer");
const auth_guard_1 = require("../auth/auth.guard");
let EventsController = class EventsController {
    constructor(eventsService) {
        this.eventsService = eventsService;
    }
    create(req, createEventDto) {
        var _a, _b;
        if (!((_a = req.token) === null || _a === void 0 ? void 0 : _a.sub))
            return null;
        return this.eventsService.create(createEventDto, (_b = req.token) === null || _b === void 0 ? void 0 : _b.sub);
    }
    findAllEventsForSportField(sportFieldId, dateFrom, dateTo) {
        return this.eventsService.findAllEventsForSportField(sportFieldId, dateFrom, dateTo);
    }
    getUserCalendarEvents(req, dateFrom, dateTo) {
        var _a, _b;
        if (!((_a = req.token) === null || _a === void 0 ? void 0 : _a.sub))
            return null;
        return this.eventsService.getUserCalendarEvents((_b = req.token) === null || _b === void 0 ? void 0 : _b.sub, dateFrom, dateTo);
    }
    getOverlappingEvents(event) {
        return this.eventsService.getOverlappingEvents((0, class_transformer_1.plainToInstance)(create_event_dto_1.CreateEventDto, event));
    }
    findOne(id) {
        return this.eventsService.findOne(id);
    }
    update(id, updateEventDto) {
        return this.eventsService.update(id, updateEventDto);
    }
    cancelEvent(id, cancelEventDto, req) {
        var _a, _b;
        if (!((_a = req.token) === null || _a === void 0 ? void 0 : _a.sub))
            return null;
        return this.eventsService.cancelEvent(id, cancelEventDto, (_b = req.token) === null || _b === void 0 ? void 0 : _b.sub);
    }
    remove(id, req) {
        var _a, _b;
        if (!((_a = req.token) === null || _a === void 0 ? void 0 : _a.sub))
            return null;
        return this.eventsService.remove(id, (_b = req.token) === null || _b === void 0 ? void 0 : _b.sub);
    }
    removeAll() {
        return this.eventsService.deleteAll();
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_event_dto_1.CreateEventDto]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./entities/event.entity").SportFieldEvent] }),
    __param(0, (0, common_1.Query)('sportFieldId')),
    __param(1, (0, common_1.Query)('dateFrom')),
    __param(2, (0, common_1.Query)('dateTo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "findAllEventsForSportField", null);
__decorate([
    (0, common_1.Get)('userCalendar'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('dateFrom')),
    __param(2, (0, common_1.Query)('dateTo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "getUserCalendarEvents", null);
__decorate([
    (0, common_1.Get)('overlapping'),
    openapi.ApiResponse({ status: 200, type: [require("../active-periods/entities/active-period.entity").ActivePeriod] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_dto_1.CreateEventDto]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "getOverlappingEvents", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: [require("./entities/event.entity").SportFieldEvent] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_event_dto_1.UpdateEventDto]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('cancel/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cancel_event_for_date_dto_1.CancelEventDto, Object]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "cancelEvent", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "removeAll", null);
EventsController = __decorate([
    (0, common_1.Controller)('events'),
    (0, swagger_1.ApiTags)('events'),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], EventsController);
exports.EventsController = EventsController;
//# sourceMappingURL=events.controller.js.map