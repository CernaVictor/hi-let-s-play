export declare const getSuggestions: (startDate: string, endDate: string, duration: number) => {
    startDate: string;
    endDate: string;
}[];
export declare const getMergedOverlappingTimeIntervals: (timeIntervalList: Array<{
    startDate: string;
    endDate: string;
}>) => {
    startDate: string;
    endDate: string;
}[];
export declare const getAvailableIntervals: (events: {
    startDate: string;
    endDate: string;
}[], startDate: string, endDate: string) => {
    startDate: string;
    endDate: string;
}[];
