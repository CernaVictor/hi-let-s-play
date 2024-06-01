'use client';

import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarOptions } from '@fullcalendar/core';

export const Calendar = (props: CalendarOptions) => {
  return (
    <FullCalendar
      plugins={[interactionPlugin, timeGridPlugin]}
      initialView="timeGridWeek"
      eventInteractive
      headerToolbar={{
        start: 'prev next today',
        center: '',
        end: 'timeGridDay timeGridWeek',
      }}
      buttonText={{ week: 'Weekly', day: 'Daily' }}
      selectable
      nowIndicator
      height={500}
      firstDay={1}
      selectOverlap={false}
      allDaySlot={false}
      {...props}
    />
  );
};
