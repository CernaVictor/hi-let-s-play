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
exports.useDeleteSportField = exports.useCreateSportField = exports.useGetSportField = exports.useGetSportFields = void 0;
const axios_1 = require("axios");
const react_query_1 = require("react-query");
const useGetSportFields = (sportCenterId) => {
    return (0, react_query_1.useQuery)(['sportFields', sportCenterId], () => __awaiter(void 0, void 0, void 0, function* () {
        return yield (yield axios_1.default.get(`/api/sport-fields`, {
            params: {
                sportCenterId,
            },
        })).data;
    }));
};
exports.useGetSportFields = useGetSportFields;
const useGetSportField = (sportFieldId) => {
    return (0, react_query_1.useQuery)(['sportField', sportFieldId], () => __awaiter(void 0, void 0, void 0, function* () {
        return yield (yield axios_1.default.get(`/api/sport-fields/${sportFieldId}`)).data;
    }));
};
exports.useGetSportField = useGetSportField;
const useCreateSportField = (sportCenterId) => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)((sportField) => __awaiter(void 0, void 0, void 0, function* () {
        return axios_1.default.post('/api/sport-fields', Object.assign(Object.assign({}, sportField), { sportCenterId }));
    }), {
        onSuccess: () => {
            queryClient.invalidateQueries(['sportFields', sportCenterId]);
        },
    });
};
exports.useCreateSportField = useCreateSportField;
const useDeleteSportField = (sportCenterId) => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)((sportFieldId) => __awaiter(void 0, void 0, void 0, function* () {
        return axios_1.default.delete(`/api/sport-fields/${sportFieldId}`);
    }), {
        onSuccess: () => {
            queryClient.invalidateQueries(['sportFields', sportCenterId]);
        },
    });
};
exports.useDeleteSportField = useDeleteSportField;
//# sourceMappingURL=useSportFieldApi.js.map