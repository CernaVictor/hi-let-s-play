import { SportField } from '../types/types';
export declare const useGetSportFields: (sportCenterId: string) => import("react-query").UseQueryResult<SportField[], unknown>;
export declare const useGetSportField: (sportFieldId: string) => import("react-query").UseQueryResult<SportField[], unknown>;
export declare const useCreateSportField: (sportCenterId: string) => import("react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, unknown, SportField, unknown>;
export declare const useDeleteSportField: (sportCenterId: string) => import("react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, unknown, string, unknown>;
