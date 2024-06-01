import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { SportCenter, Statistics } from '../types/types';

export const useGetSportCenters = () => {
  return useQuery<SportCenter[]>('sportsCenters', async () => {
    return (await axios.get('/api/sport-centers')).data;
  });
};

export const useGetSportCenterById = (
  id: string,
  fields: string[] = [],
  disableRefetchOnFocus?: boolean,
) => {
  return useQuery<SportCenter>(
    ['sportsCenter', id],
    async () => {
      return (
        await axios.get(`/api/sport-centers/${id}`, {
          params: {
            fields,
          },
        })
      ).data;
    },
    {
      refetchOnWindowFocus: !disableRefetchOnFocus,
    },
  );
};

export const useCreateSportCenter = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (sportCenter: SportCenter) => {
      return await axios.post('/api/sport-centers', sportCenter);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('sportsCenters');
      },
      onError: (err) => console.log(err),
    },
  );
};

export const useUpdateSportCenter = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (sportCenter: FormData) => {
      return await axios.put(`/api/sport-centers/${id}`, sportCenter);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['sportsCenter']);
        queryClient.invalidateQueries(['sportsCenters']);
      },
      onError: (err) => console.log(err),
    },
  );
};

export const useDeleteSportCenter = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (sportCenterId: string) => {
      return await axios.delete(`/api/sport-centers/${sportCenterId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('sportsCenters');
      },
      onError: (err) => console.log(err),
    },
  );
};

export const useGetSportCentersStatistics = (
  dateFrom: string,
  dateTo: string,
) => {
  return useQuery<Statistics[]>(
    ['sportCenterStatistics', dateFrom, dateTo],
    async () => {
      return (
        await axios.get('/api/sport-centers/statistics', {
          params: {
            dateFrom,
            dateTo,
          },
        })
      ).data;
    },
  );
};
