import axios from 'axios';
import { useQuery } from 'react-query';
import { SearchDTO, SportCenter, SportField } from '../types/types';

export const useSearchApi = (params: SearchDTO) => {
  return useQuery<
    Array<
      SportCenter & {
        sportFields: Array<
          SportField & {
            suggestions: {
              startDate: string;
              endDate: string;
            }[];
          }
        >;
      }
    >
  >(
    ['search', params],
    async () =>
      (
        await axios.get(`/api/search`, {
          params,
        })
      ).data,
    {
      enabled:
        !!params.address &&
        params.address.length > 0 &&
        Number(params.duration) > 0 &&
        !!params.sport &&
        params.sport.length > 0 &&
        !!params.intervalStart &&
        params.intervalStart?.length > 0 &&
        !!params.intervalEnd &&
        params.intervalEnd.length > 0 &&
        !!params.latitude &&
        !!params.longitude,
    },
  );
};
