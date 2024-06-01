import { Select } from '@mantine/core';
import { DayOfTheWeek } from '../../../common/types';

type DayOfTheWeekSelectProps = {
  value: DayOfTheWeek;
  onChange: (value: DayOfTheWeek) => void;
};

export const DayOfTheWeekSelect = (props: DayOfTheWeekSelectProps) => {
  const handleOnChange = (arg: string) => {
    const number = parseInt(arg);
    if (number > 0 && number <= 6) {
      props.onChange(number as DayOfTheWeek);
    } else {
      props.onChange(0);
    }
  };

  return (
    <Select
      label="Day of the week"
      value={
        typeof props.value === 'number' ? props.value.toString() : undefined
      }
      onChange={handleOnChange}
      data={[
        { value: '1', label: 'Monday' },
        { value: '2', label: 'Tuesday' },
        { value: '3', label: 'Wednesday' },
        { value: '4', label: 'Thursday' },
        { value: '5', label: 'Friday' },
        { value: '6', label: 'Saturday' },
        { value: '0', label: 'Sunday' },
      ]}
      required
    />
  );
};
