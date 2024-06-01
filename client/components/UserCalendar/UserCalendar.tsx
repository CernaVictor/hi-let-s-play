'use client';
import { DatesSetArg, EventClickArg } from '@fullcalendar/core';
import { useState } from 'react';
import { DATE_FORMAT } from '../../../common/constants';
import {
  useGetUserCalendarEvents,
  useCancelEvent,
} from '../../hooks/useEventsApi';
import { Calendar } from '../Calendar/Calendar';
import dayjs from 'dayjs';

export const UserCalendar = () => {
  const [dates, setDates] = useState({
    startDate: '',
    endDate: '',
  });

  const { formatedEvents } = useGetUserCalendarEvents(
    dates.startDate,
    dates.endDate,
  );
  const { mutate: mutateCancelEvent } = useCancelEvent();

  const handleDatesSet = (arg: DatesSetArg) => {
    setDates({
      startDate: dayjs(arg.startStr).format(DATE_FORMAT),
      endDate: dayjs(arg.endStr).format(DATE_FORMAT),
    });
  };

  const handleCancelEvent = async (arg: EventClickArg) => {
    const date = dayjs(arg.event.startStr).format(DATE_FORMAT);
    const { activePeriodId, eventId } = arg.event.extendedProps;

    mutateCancelEvent({
      eventId,
      data: {
        date,
        activePeriodId,
      },
    });
  };

  return (
    <Calendar
      events={formatedEvents}
      datesSet={handleDatesSet}
      eventClick={handleCancelEvent}
    />
  );
};
