'use client';

import {
  CalendarOptions,
  DateSelectArg,
  DatesSetArg,
  EventClickArg,
  EventContentArg,
} from '@fullcalendar/core';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { TIME_FORMAT, DATE_FORMAT } from '../../../common/constants';
import { Calendar } from '../Calendar/Calendar';
import {
  useCancelEvent,
  useDeleteEvent,
  useGetSportFieldEvents,
} from '../../hooks/useEventsApi';
import { useSession } from '../../hooks/useSession';
import { DayOfTheWeek } from '../../../common/types';
import { useGetSportCenterById } from '../../hooks/useSportCentersApi';
import {
  CancelEventData,
  CreateEventDto,
  FormatedEvent,
} from '../../types/types';
import { Button, Divider, Modal, useMantineTheme } from '@mantine/core';
import { CreateEventForm } from '../CreateEventForm/CreateEventForm';

type SportFieldCalendarProps = {
  sportFieldId: string;
  sportCenterId: string;
  calendarOptions?: CalendarOptions;
};

export const SportFieldCalendar = (props: SportFieldCalendarProps) => {
  const theme = useMantineTheme();

  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [isCancelEventModalOpen, setIsCancelEventModalOpen] = useState(false);
  const [createEventDefaultValues, setCreateEventDefaultValues] =
    useState<Omit<CreateEventDto, 'sportFieldId'>>();
  const [selectedEventToCancelData, setSelectedEventToCancelData] =
    useState<CancelEventData>();

  const toggleCreateEventModal = (
    defaultValues?: Omit<CreateEventDto, 'sportFieldId'>,
  ) => {
    if (defaultValues) setCreateEventDefaultValues(defaultValues);
    setIsCreateEventModalOpen((prev) => !prev);
  };

  const toggleCancelEventModal = (data?: CancelEventData) => {
    setIsCancelEventModalOpen((prev) => !prev);
    setSelectedEventToCancelData(data);
  };

  const { data: userData } = useSession();
  const [dates, setDates] = useState({
    startDate: '',
    endDate: '',
  });
  const { formatedEvents } = useGetSportFieldEvents(
    props.sportFieldId,
    dates.startDate,
    dates.endDate,
  );
  const { mutate: mutateCancelEvent } = useCancelEvent(props.sportFieldId);
  const { mutate: mutateDeleteEvent } = useDeleteEvent(props.sportFieldId);

  const { data: sportCenterData } = useGetSportCenterById(
    props.sportCenterId,
    ['offBusinessHours'],
    true,
  );

  const handlePeriodSelect = async (dateSelectArg: DateSelectArg) => {
    const startDate = dayjs(dateSelectArg.startStr);
    const endDate = dayjs(dateSelectArg.endStr);

    const nextDayAfterStartDate = startDate.add(1, 'day').startOf('day');

    toggleCreateEventModal({
      startTime: startDate.format(TIME_FORMAT),
      duration: endDate.diff(startDate, 'minutes'),
      validFrom: startDate.format(DATE_FORMAT),
      validThrough: (nextDayAfterStartDate.isAfter(endDate)
        ? nextDayAfterStartDate
        : endDate
      ).format(DATE_FORMAT),
      dayOfTheWeek: startDate.day() as DayOfTheWeek,
      bookerName: userData?.user?.name ?? 'unknown',
    });
  };

  const handleCancelEvent = async (arg: EventClickArg) => {
    const date = dayjs(arg.event.startStr).format(DATE_FORMAT);
    const { activePeriodId, eventId } = arg.event.extendedProps;

    toggleCancelEventModal({
      eventId,
      data: {
        date,
        activePeriodId,
      },
    });
  };

  const handleDatesSet = (arg: DatesSetArg) => {
    setDates({
      startDate: dayjs(arg.startStr).format(DATE_FORMAT),
      endDate: dayjs(arg.endStr).format(DATE_FORMAT),
    });
  };

  const formatedOffBusienssHours = useMemo(() => {
    const aggregator: FormatedEvent[] = [];
    sportCenterData?.offBusinessHours?.activePeriods.forEach((ap) => {
      aggregator.push({
        daysOfWeek: [ap.dayOfTheWeek.toString()],
        startTime: ap.startTime,
        duration: { minutes: ap.duration },
        startRecur: ap.validFrom,
        endRecur: ap.validThrough,
        activePeriodId: ap.id ?? '',
        eventId: sportCenterData.offBusinessHours.id,
        type: 'offBusinessHours',
        creator: { name: '' },
      });
    });
    return aggregator;
  }, [sportCenterData?.offBusinessHours]);

  const renderOffBusinessHour = () => {
    return (
      <div
        style={{
          backgroundColor: 'grey',
          width: '100%',
          height: '100%',
          opacity: 0.5,
        }}
      />
    );
  };

  const renderEvent = useCallback((arg: EventContentArg) => {
    const { event } = arg;
    const { type, creator } = event.extendedProps;

    if (type === 'offBusinessHours') return renderOffBusinessHour();

    return (
      <div
        style={{
          backgroundColor: '#dff7ff',
          border: '0.5px solid blue',
          width: '100%',
          height: '100%',
          opacity: 0.8,
          padding: 10,
          display: 'flex',
          borderRadius: 5,
        }}
      >
        <span style={{ color: 'black' }}>{creator?.name ?? 'unknown'}</span>
      </div>
    );
  }, []);

  return (
    <div>
      <Calendar
        events={[...formatedEvents, ...formatedOffBusienssHours]}
        eventClick={handleCancelEvent}
        select={handlePeriodSelect}
        datesSet={handleDatesSet}
        eventContent={renderEvent}
        eventBackgroundColor="transparent"
        eventBorderColor="transparent"
        {...props.calendarOptions}
      />

      <Modal
        title="Cancel event"
        centered
        opened={isCancelEventModalOpen}
        onClose={toggleCancelEventModal}
        overlayProps={{
          color:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        <div>
          <Divider />
          <div>Choose if you want to cancel or delete the event.</div>
          <div
            style={{
              marginTop: '10px',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <Button
              style={{
                backgroundColor: '#ea865f',
                marginTop: '10px',
              }}
              onClick={() => {
                !!selectedEventToCancelData &&
                  mutateCancelEvent(selectedEventToCancelData);
                toggleCancelEventModal();
              }}
            >
              Cancel event for this date
            </Button>
            <Button
              style={{
                backgroundColor: '#ea865f',
                marginTop: '10px',
              }}
              onClick={() => {
                !!selectedEventToCancelData &&
                  mutateDeleteEvent(selectedEventToCancelData.eventId);
                toggleCancelEventModal();
              }}
            >
              Delete event
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        title="Create a new event"
        opened={isCreateEventModalOpen}
        onClose={toggleCreateEventModal}
        overlayProps={{
          color:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        <CreateEventForm
          sportFieldId={props.sportFieldId}
          toggleModal={toggleCreateEventModal}
          defaultValues={createEventDefaultValues}
        />
      </Modal>
    </div>
  );
};
