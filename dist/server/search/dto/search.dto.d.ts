import { PaginationDto } from 'server/general-dtos/general-dtos';
export declare class SearchDto extends PaginationDto {
    intervalStart: string;
    intervalEnd: string;
    duration: number;
    sport: string;
    latitude: number;
    longitude: number;
}
