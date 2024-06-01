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
exports.useGetSportCentersStatistics = exports.useDeleteSportCenter = exports.useUpdateSportCenter = exports.useCreateSportCenter = exports.useGetSportCenterById = exports.useGetSportCenters = void 0;
const axios_1 = require("axios");
const react_query_1 = require("react-query");
const useGetSportCenters = () => {
    return (0, react_query_1.useQuery)('sportsCenters', () => __awaiter(void 0, void 0, void 0, function* () {
        return (yield axios_1.default.get('/api/sport-centers')).data;
    }));
};
exports.useGetSportCenters = useGetSportCenters;
const useGetSportCenterById = (id, fields = [], disableRefetchOnFocus) => {
    return (0, react_query_1.useQuery)(['sportsCenter', id], () => __awaiter(void 0, void 0, void 0, function* () {
        return (yield axios_1.default.get(`/api/sport-centers/${id}`, {
            params: {
                fields,
            },
        })).data;
    }), {
        refetchOnWindowFocus: !disableRefetchOnFocus,
    });
};
exports.useGetSportCenterById = useGetSportCenterById;
const useCreateSportCenter = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)((sportCenter) => __awaiter(void 0, void 0, void 0, function* () {
        return yield axios_1.default.post('/api/sport-centers', sportCenter);
    }), {
        onSuccess: () => {
            queryClient.invalidateQueries('sportsCenters');
        },
        onError: (err) => console.log(err),
    });
};
exports.useCreateSportCenter = useCreateSportCenter;
const useUpdateSportCenter = (id) => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)((sportCenter) => __awaiter(void 0, void 0, void 0, function* () {
        return yield axios_1.default.put(`/api/sport-centers/${id}`, sportCenter);
    }), {
        onSuccess: () => {
            queryClient.invalidateQueries(['sportsCenter']);
            queryClient.invalidateQueries(['sportsCenters']);
        },
        onError: (err) => console.log(err),
    });
};
exports.useUpdateSportCenter = useUpdateSportCenter;
const useDeleteSportCenter = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)((sportCenterId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield axios_1.default.delete(`/api/sport-centers/${sportCenterId}`);
    }), {
        onSuccess: () => {
            queryClient.invalidateQueries('sportsCenters');
        },
        onError: (err) => console.log(err),
    });
};
exports.useDeleteSportCenter = useDeleteSportCenter;
const useGetSportCentersStatistics = (dateFrom, dateTo) => {
    return (0, react_query_1.useQuery)(['sportCenterStatistics', dateFrom, dateTo], () => __awaiter(void 0, void 0, void 0, function* () {
        return (yield axios_1.default.get('/api/sport-centers/statistics', {
            params: {
                dateFrom,
                dateTo,
            },
        })).data;
    }));
};
exports.useGetSportCentersStatistics = useGetSportCentersStatistics;
//# sourceMappingURL=useSportCentersApi.js.map