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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const events_service_1 = require("../events/events.service");
const dayjs = require("dayjs");
const constants_1 = require("../../common/constants");
const utils_1 = require("../utils");
const sport_centers_service_1 = require("../sport-centers/sport-centers.service");
let SearchService = class SearchService {
    constructor(eventsService, sportCenterService) {
        this.eventsService = eventsService;
        this.sportCenterService = sportCenterService;
    }
    findAvailableFields(searchParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const { duration, intervalEnd, intervalStart, sport, latitude, longitude } = searchParams;
            const queryBuilder = this.sportCenterService.getSportCentersEventBetweenDatesQueryBuilder(intervalStart, intervalEnd);
            const sportCenters = yield queryBuilder
                .leftJoinAndSelect('sc.imageGallery', 'img')
                .leftJoin('sf.sport', 'sport')
                .where('distance(sc.latitude, sc.longitude, :latitude, :longitude) < 10000', {
                latitude,
                longitude,
            })
                .andWhere('sport.id = :sport', { sport })
                .getMany();
            const filteredSportCenters = [];
            sportCenters.forEach((sc) => {
                const filteredSportFields = [];
                sc.sportFields.forEach((sf) => {
                    var _a, _b;
                    const activePeriods = sf.events
                        .flatMap((ev) => ev.activePeriods)
                        .concat((_b = (_a = sc.offBusinessHours) === null || _a === void 0 ? void 0 : _a.activePeriods) !== null && _b !== void 0 ? _b : []);
                    const formatedActivePeriods = activePeriods.map((ap) => {
                        const [hours, minutes] = ap.startTime.split(':');
                        const weekStart = dayjs(intervalStart).startOf('week');
                        let apStartTimeInMinutes = 1440 * ap.dayOfTheWeek + Number(hours) * 60 + Number(minutes);
                        let apEndTimeInMinutes = apStartTimeInMinutes + ap.duration;
                        const intervalStartInMinutes = dayjs(intervalStart).diff(weekStart, 'minutes');
                        const intervalEndInMinutes = dayjs(intervalEnd).diff(weekStart, 'minutes');
                        if (!(intervalStartInMinutes < apEndTimeInMinutes &&
                            intervalEndInMinutes > apStartTimeInMinutes)) {
                            if (apEndTimeInMinutes > 10080) {
                                apStartTimeInMinutes -= 10080;
                                apEndTimeInMinutes -= 10080;
                            }
                            else {
                                apStartTimeInMinutes += 10080;
                                apEndTimeInMinutes += 10080;
                            }
                        }
                        const startDate = weekStart.add(apStartTimeInMinutes, 'minutes');
                        const endDate = startDate.add(ap.duration, 'minutes');
                        return {
                            startDate: startDate.format(constants_1.DATE_TIME_FORMAT),
                            endDate: endDate.format(constants_1.DATE_TIME_FORMAT),
                        };
                    });
                    const mergedIntervals = (0, utils_1.getMergedOverlappingTimeIntervals)(formatedActivePeriods);
                    if (!mergedIntervals.length) {
                        const suggestions = (0, utils_1.getSuggestions)(intervalStart, intervalEnd, duration).slice(0, 5);
                        if (suggestions.length) {
                            filteredSportFields.push(Object.assign(Object.assign({}, sf), { suggestions }));
                        }
                    }
                    else {
                        const availableIntervals = (0, utils_1.getAvailableIntervals)(mergedIntervals, intervalStart, intervalEnd);
                        const suggestions = availableIntervals
                            .flatMap((slot) => (0, utils_1.getSuggestions)(slot.startDate, slot.endDate, duration))
                            .slice(0, 5);
                        if (suggestions.length) {
                            filteredSportFields.push(Object.assign(Object.assign({}, sf), { suggestions }));
                        }
                    }
                });
                if (filteredSportFields.length) {
                    filteredSportCenters.push(Object.assign(Object.assign({}, sc), { sportFields: filteredSportFields }));
                }
            });
            return filteredSportCenters;
        });
    }
};
SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [events_service_1.EventsService,
        sport_centers_service_1.SportCentersService])
], SearchService);
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map