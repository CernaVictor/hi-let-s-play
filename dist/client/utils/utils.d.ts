export declare const getDayOfTheWeekTextByDayNumber: (weekNumber: number) => "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
export declare const groupBy: <TItem>(xs: TItem[], key: string) => {
    [key: string]: TItem[];
};
