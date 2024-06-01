import { SearchDTO, SportCenter, SportField } from '../types/types';
export declare const useSearchApi: (params: SearchDTO) => import("react-query").UseQueryResult<(SportCenter & {
    sportFields: Array<SportField & {
        suggestions: {
            startDate: string;
            endDate: string;
        }[];
    }>;
})[], unknown>;
