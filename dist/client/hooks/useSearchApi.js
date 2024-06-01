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
exports.useSearchApi = void 0;
const axios_1 = require("axios");
const react_query_1 = require("react-query");
const useSearchApi = (params) => {
    var _a;
    return (0, react_query_1.useQuery)(['search', params], () => __awaiter(void 0, void 0, void 0, function* () {
        return (yield axios_1.default.get(`/api/search`, {
            params,
        })).data;
    }), {
        enabled: !!params.address &&
            params.address.length > 0 &&
            Number(params.duration) > 0 &&
            !!params.sport &&
            params.sport.length > 0 &&
            !!params.intervalStart &&
            ((_a = params.intervalStart) === null || _a === void 0 ? void 0 : _a.length) > 0 &&
            !!params.intervalEnd &&
            params.intervalEnd.length > 0 &&
            !!params.latitude &&
            !!params.longitude,
    });
};
exports.useSearchApi = useSearchApi;
//# sourceMappingURL=useSearchApi.js.map