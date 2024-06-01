import { SportCenter, Statistics } from '../types/types';
export declare const useGetSportCenters: () => import("react-query").UseQueryResult<SportCenter[], unknown>;
export declare const useGetSportCenterById: (id: string, fields?: string[], disableRefetchOnFocus?: boolean) => import("react-query").UseQueryResult<SportCenter, unknown>;
export declare const useCreateSportCenter: () => import("react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, unknown, SportCenter, unknown>;
export declare const useUpdateSportCenter: (id: string) => import("react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, unknown, FormData, unknown>;
export declare const useDeleteSportCenter: () => import("react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, unknown, string, unknown>;
export declare const useGetSportCentersStatistics: (dateFrom: string, dateTo: string) => import("react-query").UseQueryResult<Statistics[], unknown>;
