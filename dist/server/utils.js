"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableIntervals = exports.getMergedOverlappingTimeIntervals = exports.getSuggestions = void 0;
const dayjs = require("dayjs");
const constants_1 = require("../common/constants");
const getSuggestions = (startDate, endDate, duration) => {
    try {
        const result = [];
        let suggestionStart = dayjs(startDate);
        while (suggestionStart.isBefore(endDate)) {
            const suggestionEnd = dayjs(suggestionStart).add(duration, 'minutes');
            if (suggestionEnd.isSame(endDate) || suggestionEnd.isBefore(endDate)) {
                result.push({
                    startDate: suggestionStart.format(constants_1.DATE_TIME_FORMAT),
                    endDate: suggestionEnd.format(constants_1.DATE_TIME_FORMAT),
                });
            }
            suggestionStart = suggestionStart.add(30, 'minutes');
            if (suggestionEnd.isAfter(endDate))
                break;
        }
        return result;
    }
    catch (e) {
        return [];
    }
};
exports.getSuggestions = getSuggestions;
const getMergedOverlappingTimeIntervals = (timeIntervalList) => {
    if (timeIntervalList.length < 2)
        return timeIntervalList;
    timeIntervalList.sort((a, b) => dayjs(a.startDate).diff(b.startDate));
    const result = [];
    let prev = timeIntervalList[0];
    for (let i = 1; i < timeIntervalList.length; i++) {
        const current = timeIntervalList[i];
        if (dayjs(prev.endDate).isSame(current.startDate) ||
            dayjs(prev.endDate).isAfter(current.startDate)) {
            prev.endDate = dayjs(prev.endDate).isAfter(current.endDate)
                ? prev.endDate
                : current.endDate;
        }
        else {
            result.push({
                startDate: dayjs(prev.startDate).format(constants_1.DATE_TIME_FORMAT),
                endDate: dayjs(prev.endDate).format(constants_1.DATE_TIME_FORMAT),
            });
            prev = current;
        }
    }
    result.push({
        startDate: dayjs(prev.startDate).format(constants_1.DATE_TIME_FORMAT),
        endDate: dayjs(prev.endDate).format(constants_1.DATE_TIME_FORMAT),
    });
    return result;
};
exports.getMergedOverlappingTimeIntervals = getMergedOverlappingTimeIntervals;
const getAvailableIntervals = (events, startDate, endDate) => {
    const availableIntervals = [];
    let startOfAvailableSlot = dayjs(startDate);
    events.forEach((event, index) => {
        const eventStart = dayjs(event.startDate);
        const eventEnd = dayjs(event.endDate);
        if (startOfAvailableSlot.isBefore(eventStart)) {
            availableIntervals.push({
                startDate: startOfAvailableSlot.format(constants_1.DATE_TIME_FORMAT),
                endDate: eventStart.format(constants_1.DATE_TIME_FORMAT),
            });
        }
        startOfAvailableSlot = eventEnd;
        if (index === events.length - 1) {
            if (eventEnd.isBefore(endDate)) {
                availableIntervals.push({
                    startDate: eventEnd.format(constants_1.DATE_TIME_FORMAT),
                    endDate: dayjs(endDate).format(constants_1.DATE_TIME_FORMAT),
                });
            }
        }
    });
    return availableIntervals;
};
exports.getAvailableIntervals = getAvailableIntervals;
//# sourceMappingURL=utils.js.map