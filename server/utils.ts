import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'common/constants';

// we can improve by adding a limit as an arg (and remove slicing where needed)
export const getSuggestions = (
  startDate: string,
  endDate: string,
  duration: number,
  // limit?: number
) => {
  try {
    const result: { startDate: string; endDate: string }[] = [];
    let suggestionStart = dayjs(startDate);

    while (suggestionStart.isBefore(endDate)) {
      const suggestionEnd = dayjs(suggestionStart).add(duration, 'minutes');

      if (suggestionEnd.isSame(endDate) || suggestionEnd.isBefore(endDate)) {
        result.push({
          startDate: suggestionStart.format(DATE_TIME_FORMAT),
          endDate: suggestionEnd.format(DATE_TIME_FORMAT),
        });
      }

      suggestionStart = suggestionStart.add(30, 'minutes');
      if (suggestionEnd.isAfter(endDate)) break;
    }
    return result;
  } catch (e) {
    return [];
  }
};

export const getMergedOverlappingTimeIntervals = (
  timeIntervalList: Array<{ startDate: string; endDate: string }>,
) => {
  if (timeIntervalList.length < 2) return timeIntervalList;

  timeIntervalList.sort((a, b) => dayjs(a.startDate).diff(b.startDate));

  const result: Array<{ startDate: string; endDate: string }> = [];
  let prev = timeIntervalList[0];

  for (let i = 1; i < timeIntervalList.length; i++) {
    const current = timeIntervalList[i];
    if (
      dayjs(prev.endDate).isSame(current.startDate) ||
      dayjs(prev.endDate).isAfter(current.startDate)
    ) {
      prev.endDate = dayjs(prev.endDate).isAfter(current.endDate)
        ? prev.endDate
        : current.endDate;
    } else {
      result.push({
        startDate: dayjs(prev.startDate).format(DATE_TIME_FORMAT),
        endDate: dayjs(prev.endDate).format(DATE_TIME_FORMAT),
      });
      prev = current;
    }
  }
  result.push({
    startDate: dayjs(prev.startDate).format(DATE_TIME_FORMAT),
    endDate: dayjs(prev.endDate).format(DATE_TIME_FORMAT),
  });

  return result;
};

export const getAvailableIntervals = (
  events: Array<{ startDate: string; endDate: string }>,
  startDate: string,
  endDate: string,
) => {
  const availableIntervals: Array<{ startDate: string; endDate: string }> = [];
  let startOfAvailableSlot = dayjs(startDate);

  events.forEach((event, index) => {
    const eventStart = dayjs(event.startDate);
    const eventEnd = dayjs(event.endDate);
    if (startOfAvailableSlot.isBefore(eventStart)) {
      availableIntervals.push({
        startDate: startOfAvailableSlot.format(DATE_TIME_FORMAT),
        endDate: eventStart.format(DATE_TIME_FORMAT),
      });
    }
    startOfAvailableSlot = eventEnd;
    if (index === events.length - 1) {
      if (eventEnd.isBefore(endDate)) {
        availableIntervals.push({
          startDate: eventEnd.format(DATE_TIME_FORMAT),
          endDate: dayjs(endDate).format(DATE_TIME_FORMAT),
        });
      }
    }
  });
  return availableIntervals;
};
