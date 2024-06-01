"use strict";
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
exports.useDeleteEvent = exports.useCancelEvent = exports.useCreateEvent = exports.useGetUserCalendarEvents = exports.useGetSportFieldEvents = void 0;
const react_query_1 = require("react-query");
const axios_1 = require("axios");
const react_1 = require("react");
const useGetSportFieldEvents = (sportFieldId, dateFrom, dateTo) => {
    const query = (0, react_query_1.useQuery)(['sportFieldEvents', sportFieldId, dateFrom, dateTo], () => __awaiter(void 0, void 0, void 0, function* () {
        return yield (yield axios_1.default.get(`/api/events`, {
            params: {
                sportFieldId,
                dateFrom,
                dateTo,
            },
        })).data;
    }), { enabled: dateFrom.length !== 0 && dateTo.length !== 0 });
    const formatedEvents = (0, react_1.useMemo)(() => {
        var _a;
        const aggregator = [];
        (_a = query.data) === null || _a === void 0 ? void 0 : _a.forEach((event) => {
            event.activePeriods.forEach((ap) => {
                aggregator.push({
                    daysOfWeek: [ap.dayOfTheWeek.toString()],
                    startTime: ap.startTime,
                    duration: { minutes: ap.duration },
                    startRecur: ap.validFrom,
                    endRecur: ap.validThrough,
                    activePeriodId: ap.id,
                    eventId: event.id,
                    type: 'singleEvent',
                    creator: event.creator,
                });
            });
        });
        return aggregator;
    }, [query.data]);
    return Object.assign(Object.assign({}, query), { formatedEvents });
};
exports.useGetSportFieldEvents = useGetSportFieldEvents;
const useGetUserCalendarEvents = (dateFrom, dateTo) => {
    const query = (0, react_query_1.useQuery)(['userCalendar', dateFrom, dateTo], () => __awaiter(void 0, void 0, void 0, function* () {
        return yield (yield axios_1.default.get(`/api/events/userCalendar`, {
            params: {
                dateFrom,
                dateTo,
            },
        })).data;
    }), { enabled: dateFrom.length !== 0 && dateTo.length !== 0 });
    const formatedEvents = (0, react_1.useMemo)(() => {
        var _a;
        const aggregator = [];
        (_a = query.data) === null || _a === void 0 ? void 0 : _a.forEach((event) => {
            event.activePeriods.forEach((ap) => {
                aggregator.push({
                    daysOfWeek: [ap.dayOfTheWeek.toString()],
                    startTime: ap.startTime,
                    duration: { minutes: ap.duration },
                    startRecur: ap.validFrom,
                    endRecur: ap.validThrough,
                    activePeriodId: ap.id,
                    eventId: event.id,
                    type: 'singleEvent',
                    creator: event.creator,
                });
            });
        });
        return aggregator;
    }, [query.data]);
    return Object.assign(Object.assign({}, query), { formatedEvents });
};
exports.useGetUserCalendarEvents = useGetUserCalendarEvents;
const useCreateEvent = (sportFieldId) => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)((data) => __awaiter(void 0, void 0, void 0, function* () {
        return axios_1.default.post('/api/events', Object.assign(Object.assign({}, data), { sportFieldId }));
    }), {
        onSuccess: () => {
            queryClient.invalidateQueries(['sportFieldEvents', sportFieldId]);
            queryClient.invalidateQueries(['search']);
        },
    });
};
exports.useCreateEvent = useCreateEvent;
const useCancelEvent = (sportFieldId) => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)((dto) => __awaiter(void 0, void 0, void 0, function* () {
        return axios_1.default.put(`/api/events/cancel/${dto.eventId}`, dto.data);
    }), {
        onSuccess: () => {
            queryClient.invalidateQueries(['sportFieldEvents', sportFieldId]);
            queryClient.invalidateQueries(['userCalendar']);
        },
    });
};
exports.useCancelEvent = useCancelEvent;
const useDeleteEvent = (sportFieldId) => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)((eventId) => __awaiter(void 0, void 0, void 0, function* () {
        return axios_1.default.delete(`/api/events/${eventId}`);
    }), {
        onSuccess: () => {
            queryClient.invalidateQueries(['sportFieldEvents', sportFieldId]);
            queryClient.invalidateQueries(['userCalendar']);
        },
    });
};
exports.useDeleteEvent = useDeleteEvent;
//# sourceMappingURL=useEventsApi.js.map