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
exports.SportCentersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const photo_entity_1 = require("../entities/photo.entity");
const event_entity_1 = require("../events/entities/event.entity");
const file_upload_service_1 = require("../file-upload/file-upload.service");
const typeorm_2 = require("typeorm");
const sport_center_entity_1 = require("./entities/sport-center.entity");
const dayjs = require("dayjs");
const constants_1 = require("../../common/constants");
let SportCentersService = class SportCentersService {
    constructor(sportsCenterRepository, offBussinessHoursRepository, photoRepository, fileUploadService) {
        this.sportsCenterRepository = sportsCenterRepository;
        this.offBussinessHoursRepository = offBussinessHoursRepository;
        this.photoRepository = photoRepository;
        this.fileUploadService = fileUploadService;
        this.getSportCentersEventBetweenDatesQueryBuilder = (intervalStart, intervalEnd) => {
            const existingEventStartTimeInMinutes = `((ap."dayOfTheWeek" * 1440) + extract(epoch from ap."startTime") / 60)`;
            const existingEventEndTimeInMinutes = `((ap."dayOfTheWeek" * 1440) + extract(epoch from ap."startTime") / 60 + ap."duration")`;
            const existingObhStartTimeInMinutes = `((obh_ap."dayOfTheWeek" * 1440) + extract(epoch from obh_ap."startTime") / 60)`;
            const existingObhEndTimeInMinutes = `((obh_ap."dayOfTheWeek" * 1440) + extract(epoch from obh_ap."startTime") / 60 + obh_ap."duration")`;
            const startTimeInMinutes = dayjs(intervalStart).diff(dayjs(intervalStart).startOf('week'), 'minutes');
            const endTimeInMinutes = startTimeInMinutes + dayjs(intervalEnd).diff(intervalStart, 'minutes');
            return this.sportsCenterRepository
                .createQueryBuilder('sc')
                .leftJoinAndSelect('sc.sportFields', 'sf')
                .leftJoinAndSelect('sf.events', 'ev')
                .leftJoinAndSelect('sc.offBusinessHours', 'obh')
                .leftJoinAndSelect('ev.activePeriods', 'ap', `(ap.validThrough IS DISTINCT FROM ap.validFrom)  
        AND (ap.validThrough >= :validFrom OR ap.validThrough IS NULL)  
        AND (ap.validFrom <= :validThrough)
        AND ((
          :startTimeInMinutes < ${existingEventEndTimeInMinutes}
          AND :endTimeInMinutes > ${existingEventStartTimeInMinutes}
        )
        OR 
        (
            CASE
                WHEN :endTimeInMinutes > 10080 THEN (:endTimeInMinutes % 10080) > ${existingEventStartTimeInMinutes}
                WHEN ${existingEventEndTimeInMinutes} > 10080 THEN ${existingEventEndTimeInMinutes} - 10080 > :startTimeInMinutes
            END
        ))`, {
                validFrom: intervalStart,
                validThrough: intervalEnd,
                startTimeInMinutes,
                endTimeInMinutes,
            })
                .leftJoinAndSelect('obh.activePeriods', 'obh_ap', `(obh_ap.validThrough IS DISTINCT FROM obh_ap.validFrom)  
        AND (obh_ap.validThrough >= :validFrom OR obh_ap.validThrough IS NULL)  
        AND (obh_ap.validFrom <= :validThrough)
        AND ((
          :startTimeInMinutes < ${existingObhEndTimeInMinutes}
          AND :endTimeInMinutes > ${existingObhStartTimeInMinutes}
        )
        OR 
        (
            CASE
                WHEN :endTimeInMinutes > 10080 THEN (:endTimeInMinutes % 10080) > ${existingObhStartTimeInMinutes}
                WHEN ${existingObhEndTimeInMinutes} > 10080 THEN ${existingObhEndTimeInMinutes} - 10080 > :startTimeInMinutes
            END
        ))`, {
                validFrom: intervalStart,
                validThrough: intervalEnd,
                startTimeInMinutes,
                endTimeInMinutes,
            });
        };
    }
    create(createSportCenterDto, ownerId) {
        const sportsCenter = this.sportsCenterRepository.create(Object.assign(Object.assign({}, createSportCenterDto), { owner: {
                id: ownerId,
            } }));
        return this.sportsCenterRepository.save(sportsCenter);
    }
    findAll(id) {
        return this.sportsCenterRepository.find({
            where: {
                owner: {
                    id,
                },
            },
        });
    }
    findOne(id, fields) {
        return this.sportsCenterRepository.findOne({
            where: { id },
            relations: fields,
        });
    }
    updateImageGallery(sportCenter, existingGallery, files, newGallery) {
        return __awaiter(this, void 0, void 0, function* () {
            const remainingPhotosId = newGallery === null || newGallery === void 0 ? void 0 : newGallery.filter((el) => !!el.id).map((el) => el.id);
            const photosToBeDeleted = existingGallery.filter((el) => !(remainingPhotosId === null || remainingPhotosId === void 0 ? void 0 : remainingPhotosId.includes(el.id)));
            const remainingPhotos = existingGallery.filter((el) => remainingPhotosId === null || remainingPhotosId === void 0 ? void 0 : remainingPhotosId.includes(el.id));
            this.fileUploadService.destroyFiles(photosToBeDeleted.map((photo) => photo.id));
            this.photoRepository.remove(photosToBeDeleted);
            const results = yield this.fileUploadService.uploadFiles(files, sportCenter.id);
            const newImages = this.photoRepository.create(results);
            return this.sportsCenterRepository.save(Object.assign(Object.assign({}, sportCenter), { imageGallery: [...remainingPhotos, ...newImages] }));
        });
    }
    update(id, updateSportCenterDto, files, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sportCenter = yield this.sportsCenterRepository.findOneOrFail({
                where: {
                    id,
                    owner: {
                        id: userId,
                    },
                },
                relations: {
                    imageGallery: true,
                },
            });
            if (files.length || !!updateSportCenterDto.imageGallery) {
                yield this.updateImageGallery(sportCenter, sportCenter.imageGallery, files, updateSportCenterDto.imageGallery);
            }
            const updatedSportCenter = Object.assign(Object.assign(Object.assign({}, sportCenter), updateSportCenterDto), { imageGallery: undefined });
            if (!!updateSportCenterDto.offBusinessHours) {
                const newBusinessHours = this.offBussinessHoursRepository.create(updateSportCenterDto.offBusinessHours);
                updatedSportCenter.offBusinessHours = newBusinessHours;
            }
            return this.sportsCenterRepository.save(updatedSportCenter);
        });
    }
    remove(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sportCenter = yield this.sportsCenterRepository.findOneOrFail({
                where: {
                    id,
                    owner: {
                        id: userId,
                    },
                },
            });
            return this.sportsCenterRepository.remove(sportCenter);
        });
    }
    checkSportCenterOwner(sportCenterId, userId) {
        return this.sportsCenterRepository.findOneOrFail({
            where: {
                id: sportCenterId,
                owner: {
                    id: userId,
                },
            },
        });
    }
    getSportCenterStatistics(userId, dateFrom, dateTo) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryBuilder = this.getSportCentersEventBetweenDatesQueryBuilder(dateFrom, dateTo);
            const sportCenters = yield queryBuilder
                .leftJoinAndSelect('sc.owner', 'owner')
                .leftJoinAndSelect('ev.creator', 'creator')
                .where('owner.id = :userId', { userId })
                .getMany();
            const statistics = [];
            sportCenters.forEach((sportCenter) => {
                var _a;
                let nrOfEvents = 0;
                let nrOfUsers = 0;
                let duration = 0;
                let offDuration = 0;
                sportCenter.sportFields.forEach((sportField) => {
                    nrOfEvents += sportField.events.length;
                    const sportFieldUsers = [];
                    sportField.events.forEach((event) => {
                        var _a, _b;
                        if (((_a = event.creator) === null || _a === void 0 ? void 0 : _a.id) &&
                            !sportFieldUsers.includes((_b = event.creator) === null || _b === void 0 ? void 0 : _b.id)) {
                            sportFieldUsers.push(event.creator.id);
                        }
                        event.activePeriods.forEach((ap) => {
                            const end = !!ap.validThrough && dayjs(ap.validThrough).isBefore(dateTo)
                                ? dayjs(ap.validThrough).format(constants_1.DATE_FORMAT)
                                : dateTo;
                            const start = !!ap.validFrom && dayjs(ap.validFrom).isAfter(dateFrom)
                                ? dayjs(ap.validFrom).format(constants_1.DATE_FORMAT)
                                : dateFrom;
                            const nrOfOccurences = Math.floor(dayjs(end).diff(start, 'days') / 7);
                            duration += ap.duration * (nrOfOccurences ? nrOfOccurences : 1);
                        });
                    });
                    nrOfUsers += sportFieldUsers.length;
                });
                (_a = sportCenter.offBusinessHours) === null || _a === void 0 ? void 0 : _a.activePeriods.forEach((ap) => {
                    const end = !!ap.validThrough && dayjs(ap.validThrough).isBefore(dateTo)
                        ? dayjs(ap.validThrough).format(constants_1.DATE_FORMAT)
                        : dateTo;
                    const start = !!ap.validFrom && dayjs(ap.validFrom).isAfter(dateFrom)
                        ? ap.validFrom
                        : dateFrom;
                    const nrOfOccurences = Math.floor(dayjs(end).diff(start, 'days') / 7);
                    offDuration += ap.duration * (nrOfOccurences ? nrOfOccurences : 1);
                });
                const intervalInMinutes = dayjs(dateTo).diff(dateFrom, 'minutes');
                const occupiedPercentage = (duration / (intervalInMinutes - offDuration)) * 100;
                statistics.push({
                    name: sportCenter.name,
                    nrOfEvents,
                    nrOfUsers,
                    occupiedPercentage: occupiedPercentage.toFixed(2),
                });
            });
            return statistics;
        });
    }
};
SportCentersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sport_center_entity_1.SportCenter)),
    __param(1, (0, typeorm_1.InjectRepository)(event_entity_1.OffBusinessHours)),
    __param(2, (0, typeorm_1.InjectRepository)(photo_entity_1.SportCenterPhoto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        file_upload_service_1.FileUploadService])
], SportCentersService);
exports.SportCentersService = SportCentersService;
//# sourceMappingURL=sport-centers.service.js.map