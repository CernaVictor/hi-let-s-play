"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupBy = exports.getDayOfTheWeekTextByDayNumber = void 0;
const getDayOfTheWeekTextByDayNumber = (weekNumber) => {
    switch (weekNumber) {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
        default:
            return 'Sunday';
    }
};
exports.getDayOfTheWeekTextByDayNumber = getDayOfTheWeekTextByDayNumber;
const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};
exports.groupBy = groupBy;
//# sourceMappingURL=utils.js.map