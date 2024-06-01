"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSession = void 0;
const react_1 = require("next-auth/react");
const useSession = (sessionOptions) => {
    const { data, status } = (0, react_1.useSession)(sessionOptions);
    const typedData = data;
    return {
        data: typedData,
        status,
    };
};
exports.useSession = useSession;
//# sourceMappingURL=useSession.js.map