export const getDayOfTheWeekTextByDayNumber = (weekNumber: number) => {
  switch (weekNumber) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return 'Sunday';
  }
};

export const groupBy = function <TItem>(
  xs: TItem[],
  key: string,
): { [key: string]: TItem[] } {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
