import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { SportField } from '../types/types';

export const useGetSportFields = (sportCenterId: string) => {
  return useQuery<SportField[]>(
    ['sportFields', sportCenterId],
    async () =>
      await (
        await axios.get(`/api/sport-fields`, {
          params: {
            sportCenterId,
          },
        })
      ).data,
  );
};

export const useGetSportField = (sportFieldId: string) => {
  return useQuery<SportField[]>(
    ['sportField', sportFieldId],
    async () =>
      await (
        await axios.get(`/api/sport-fields/${sportFieldId}`)
      ).data,
  );
};

export const useCreateSportField = (sportCenterId: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (sportField: SportField) => {
      return axios.post('/api/sport-fields', { ...sportField, sportCenterId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['sportFields', sportCenterId]);
      },
    },
  );
};

export const useDeleteSportField = (sportCenterId: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (sportFieldId: string) => {
      return axios.delete(`/api/sport-fields/${sportFieldId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['sportFields', sportCenterId]);
      },
    },
  );
};
