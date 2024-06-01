import axios from 'axios';
import { useQuery } from 'react-query';
import { Sport } from '../types/types';

export const useSportsApi = () => {
  return useQuery<Sport[]>(
    ['sports'],
    async () => (await axios.get(`/api/sports`)).data,
  );
};
