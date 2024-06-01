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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const active_period_entity_1 = require("../active-periods/entities/active-period.entity");
const typeorm_2 = require("typeorm");
const event_entity_1 = require("./entities/event.entity");
const dayjs = require("dayjs");
const sport_center_entity_1 = require("../sport-centers/entities/sport-center.entity");
let EventsService = class EventsService {
    constructor(sportCenterRepository, eventRepository, activePeriodRepository) {
        this.sportCenterRepository = sportCenterRepository;
        this.eventRepository = eventRepository;
        this.activePeriodRepository = activePeriodRepository;
    }
    create(createEventDto, creatorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const overlappingEvents = yield this.getOverlappingEvents(createEventDto);
            if (overlappingEvents.length) {
                throw new common_1.HttpException('Overlapping event', common_1.HttpStatus.CONFLICT);
            }
            const activePeriod = this.activePeriodRepository.create(createEventDto);
            const event = this.eventRepository.create({
                activePeriods: [activePeriod],
                sportField: {
                    id: createEventDto.sportFieldId,
                },
                creator: {
                    id: creatorId,
                },
            });
            return this.eventRepository.save(event);
        });
    }
    findAllEventsForSportField(sportFieldId, dateFrom, dateTo) {
        return this.eventRepository.find({
            where: [
                {
                    sportField: { id: sportFieldId },
                    activePeriods: {
                        validFrom: (0, typeorm_2.LessThanOrEqual)(dateTo),
                        validThrough: (0, typeorm_2.MoreThanOrEqual)(dateFrom),
                    },
                },
                {
                    sportField: { id: sportFieldId },
                    activePeriods: {
                        validFrom: (0, typeorm_2.LessThanOrEqual)(dateTo),
                        validThrough: (0, typeorm_2.IsNull)(),
                    },
                },
            ],
        });
    }
    getUserCalendarEvents(userId, dateFrom, dateTo) {
        return this.eventRepository.find({
            where: [
                {
                    creator: { id: userId },
                    activePeriods: {
                        validFrom: (0, typeorm_2.LessThanOrEqual)(dateTo),
                        validThrough: (0, typeorm_2.MoreThanOrEqual)(dateFrom),
                    },
                },
                {
                    creator: { id: userId },
                    activePeriods: {
                        validFrom: (0, typeorm_2.LessThanOrEqual)(dateTo),
                        validThrough: (0, typeorm_2.IsNull)(),
                    },
                },
            ],
        });
    }
    findOne(id) {
        return this.eventRepository.find({ where: { id } });
    }
    update(id, updateEventDto) {
        return this.eventRepository.update(id, updateEventDto);
    }
    remove(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.eventRepository.findOneOrFail({
                where: [
                    {
                        id,
                        creator: {
                            id: userId,
                        },
                    },
                    {
                        id,
                        sportField: {
                            sportCenter: {
                                owner: {
                                    id: userId,
                                },
                            },
                        },
                    },
                ],
            });
            return this.eventRepository.remove(event);
        });
    }
    deleteAll() {
        return this.eventRepository.createQueryBuilder().delete().execute();
    }
    getOverlappingEvents({ validFrom, validThrough, dayOfTheWeek, duration, startTime, sportFieldId, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const [hours, minutes] = startTime.split(':');
            const startTimeInMinutes = Number(dayOfTheWeek) * 1440 + Number(hours) * 60 + Number(minutes);
            const endTimeInMinutes = startTimeInMinutes + duration;
            const existingEventStartTimeInMinutes = `((ap."dayOfTheWeek" * 1440) + extract(epoch from ap."startTime") / 60)`;
            const existingEventEndTimeInMinutes = `((ap."dayOfTheWeek" * 1440) + extract(epoch from ap."startTime") / 60 + ap."duration")`;
            const sportCenter = yield this.sportCenterRepository.findOneOrFail({
                where: {
                    sportFields: {
                        id: sportFieldId,
                    },
                },
            });
            const queryBuilder = this.activePeriodRepository
                .createQueryBuilder('ap')
                .leftJoin('ap.event', 'event')
                .leftJoin('event.sportField', 'sportField')
                .leftJoin('event.sportCenter', 'sportCenter')
                .andWhere(`(sportField.id = :sportFieldId OR sportCenter.id = :sportCenterId)`, {
                sportFieldId,
                sportCenterId: sportCenter.id,
            })
                .andWhere('(ap.validThrough >= :validFrom OR ap.validThrough IS NULL)', {
                validFrom,
            });
            if (validThrough) {
                queryBuilder.andWhere('(ap.validFrom <= :validThrough)', {
                    validThrough,
                });
            }
            queryBuilder.andWhere(`
      ((
        :startTimeInMinutes1 < ${existingEventEndTimeInMinutes}
        AND :endTimeInMinutes1 > ${existingEventStartTimeInMinutes}
      )
      OR 
      (
          CASE
              WHEN :endTimeInMinutes2 > 10080 THEN (:endTimeInMinutes3 % 10080) > ${existingEventStartTimeInMinutes}
              WHEN ${existingEventEndTimeInMinutes} > 10080 THEN ${existingEventEndTimeInMinutes} - 10080 > :startTimeInMinutes2
          END
      ))
      `, {
                startTimeInMinutes1: startTimeInMinutes,
                startTimeInMinutes2: startTimeInMinutes,
                endTimeInMinutes1: endTimeInMinutes,
                endTimeInMinutes2: endTimeInMinutes,
                endTimeInMinutes3: endTimeInMinutes,
            });
            return queryBuilder.getMany();
        });
    }
    cancelEvent(id, cancelEventDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { date, activePeriodId } = cancelEventDto;
            const event = yield this.eventRepository.findOneOrFail({
                where: [
                    {
                        id,
                        creator: {
                            id: userId,
                        },
                    },
                    {
                        id,
                        sportField: {
                            sportCenter: {
                                owner: {
                                    id: userId,
                                },
                            },
                        },
                    },
                ],
                relations: {
                    activePeriods: true,
                },
            });
            const activePeriod = event === null || event === void 0 ? void 0 : event.activePeriods.find((ap) => ap.id === activePeriodId);
            if (!event || !activePeriod)
                return;
            const nextActivePeriod = this.activePeriodRepository.create({
                dayOfTheWeek: activePeriod.dayOfTheWeek,
                duration: activePeriod.duration,
                startTime: activePeriod.startTime,
                validFrom: dayjs(date).add(1, 'week').format(),
                validThrough: activePeriod.validThrough,
            });
            activePeriod.validThrough = date;
            const validActivePeriods = event.activePeriods.filter((ap) => ap.id !== activePeriodId);
            if (!activePeriod.validThrough ||
                (!dayjs(activePeriod.validFrom).isSame(activePeriod.validThrough) &&
                    dayjs(activePeriod.validFrom).isBefore(activePeriod.validThrough))) {
                validActivePeriods.push(activePeriod);
            }
            else {
                this.activePeriodRepository.remove(activePeriod);
            }
            if (!nextActivePeriod.validThrough ||
                (!dayjs(nextActivePeriod.validFrom).isSame(nextActivePeriod.validThrough) &&
                    dayjs(nextActivePeriod.validFrom).isBefore(nextActivePeriod.validThrough))) {
                validActivePeriods.push(nextActivePeriod);
            }
            if (validActivePeriods.length) {
                event.activePeriods = validActivePeriods;
                return this.eventRepository.save(event);
            }
            return this.eventRepository.remove(event);
        });
    }
};
EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sport_center_entity_1.SportCenter)),
    __param(1, (0, typeorm_1.InjectRepository)(event_entity_1.SportFieldEvent)),
    __param(2, (0, typeorm_1.InjectRepository)(active_period_entity_1.ActivePeriod)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EventsService);
exports.EventsService = EventsService;
//# sourceMappingURL=events.service.js.map