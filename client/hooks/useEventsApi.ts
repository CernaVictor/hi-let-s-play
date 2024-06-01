import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { useMemo } from 'react';
import {
  CancelEventDto,
  CreateEventDto,
  Event,
  FormatedEvent,
} from '../types/types';

export const useGetSportFieldEvents = (
  sportFieldId: string,
  dateFrom: string,
  dateTo: string,
) => {
  const query = useQuery<Event[]>(
    ['sportFieldEvents', sportFieldId, dateFrom, dateTo],
    async () =>
      await (
        await axios.get(`/api/events`, {
          params: {
            sportFieldId,
            dateFrom,
            dateTo,
          },
        })
      ).data,
    { enabled: dateFrom.length !== 0 && dateTo.length !== 0 },
  );

  const formatedEvents = useMemo(() => {
    const aggregator: FormatedEvent[] = [];
    query.data?.forEach((event) => {
      event.activePeriods.forEach((ap) => {
        aggregator.push({
          daysOfWeek: [ap.dayOfTheWeek.toString()],
          startTime: ap.startTime,
          duration: { minutes: ap.duration },
          startRecur: ap.validFrom,
          endRecur: ap.validThrough,
          activePeriodId: ap.id,
          eventId: event.id,
          type: 'singleEvent',
          creator: event.creator,
        });
      });
    });
    return aggregator;
  }, [query.data]);

  return { ...query, formatedEvents };
};

export const useGetUserCalendarEvents = (dateFrom: string, dateTo: string) => {
  const query = useQuery<Event[]>(
    ['userCalendar', dateFrom, dateTo],
    async () =>
      await (
        await axios.get(`/api/events/userCalendar`, {
          params: {
            dateFrom,
            dateTo,
          },
        })
      ).data,
    { enabled: dateFrom.length !== 0 && dateTo.length !== 0 },
  );

  const formatedEvents = useMemo(() => {
    const aggregator: FormatedEvent[] = [];
    query.data?.forEach((event) => {
      event.activePeriods.forEach((ap) => {
        aggregator.push({
          daysOfWeek: [ap.dayOfTheWeek.toString()],
          startTime: ap.startTime,
          duration: { minutes: ap.duration },
          startRecur: ap.validFrom,
          endRecur: ap.validThrough,
          activePeriodId: ap.id,
          eventId: event.id,
          type: 'singleEvent',
          creator: event.creator,
        });
      });
    });
    return aggregator;
  }, [query.data]);

  return { ...query, formatedEvents };
};

export const useCreateEvent = (sportFieldId: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data: Omit<CreateEventDto, 'sportFieldId'>) => {
      return axios.post('/api/events', { ...data, sportFieldId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['sportFieldEvents', sportFieldId]);
        queryClient.invalidateQueries(['search']);
      },
    },
  );
};

export const useCancelEvent = (sportFieldId?: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (dto: CancelEventDto) => {
      return axios.put(`/api/events/cancel/${dto.eventId}`, dto.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['sportFieldEvents', sportFieldId]);
        queryClient.invalidateQueries(['userCalendar']);
      },
    },
  );
};

export const useDeleteEvent = (sportFieldId?: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (eventId: string) => {
      return axios.delete(`/api/events/${eventId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['sportFieldEvents', sportFieldId]);
        queryClient.invalidateQueries(['userCalendar']);
      },
    },
  );
};
