import { Button, Divider, Checkbox, Select } from '@mantine/core';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import {
  IconCalendar,
  IconRotateClockwise,
  IconCheck,
  IconX,
  IconClock,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../../../common/constants';
import { DayOfTheWeek } from '../../../common/types';
import { useCreateEvent } from '../../hooks/useEventsApi';
import { CreateEventDto } from '../../types/types';
import { useStyles } from './CreateEventFormStyles';
import { notifications } from '@mantine/notifications';

const durationArr = [
  {
    label: '1 hour',
    value: '60',
  },
  {
    label: '1.5 hours',
    value: '90',
  },
  {
    label: '2 hours',
    value: '120',
  },
  {
    label: '2.5 hours',
    value: '150',
  },
  {
    label: '3 hours',
    value: '180',
  },
];

type EventFormProps = {
  sportFieldId: string;
  defaultValues?: Omit<CreateEventDto, 'sportFieldId'>;
  toggleModal: () => void;
};

export const CreateEventForm = (props: EventFormProps) => {
  const { control, handleSubmit, register } = useForm<
    Omit<CreateEventDto, 'sportFieldId'>
  >({ defaultValues: props.defaultValues });
  const [checked, setChecked] = useState(false);
  const { data: userData } = useSession();

  const { classes } = useStyles();

  const {
    mutate: mutateCreateEvent,
    isSuccess,
    isError,
  } = useCreateEvent(props.sportFieldId);

  const onSubmit: SubmitHandler<CreateEventDto> = (data, event) => {
    event?.preventDefault();

    const startDate = dayjs(data.validFrom);
    let endDate = dayjs(data.validThrough);

    const nextDayAfterStartDate = startDate.add(1, 'day').startOf('day');

    if (endDate) {
      endDate = endDate.isAfter(startDate.add(Number(data.duration), 'minutes'))
        ? endDate
        : nextDayAfterStartDate;
    }

    mutateCreateEvent({
      startTime: data.startTime,
      duration: Number(data.duration),
      validFrom: data.validFrom,
      validThrough: checked ? null : endDate.format(DATE_FORMAT),
      dayOfTheWeek: startDate.day() as DayOfTheWeek,
      bookerName: userData?.user?.name ?? 'unknown',
    });

    props.toggleModal();
  };

  if (isError) {
    notifications.show({
      withCloseButton: true,
      autoClose: 5000,
      icon: <IconX />,
      title: 'Alert',
      message: 'Event could not be scheduled',
      color: 'red',
    });

    notifications.cleanQueue();
  }

  if (isSuccess) {
    notifications.show({
      withCloseButton: true,
      autoClose: 5000,
      icon: <IconCheck />,
      title: 'Alert',
      message: 'Event scheduled',
      color: 'teal',
    });

    notifications.cleanQueue();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Divider mb={'10px'} />
      <div
        style={{
          height: '500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <Controller
          control={control}
          name="validFrom"
          render={({ field: { onChange, value } }) => (
            <DatePickerInput
              valueFormat="DD MMM YYYY"
              label="Date"
              placeholder="Pick date"
              icon={<IconCalendar size="1rem" />}
              onChange={(value) => {
                onChange(dayjs(value).format(DATE_FORMAT));
              }}
              minDate={dayjs().toDate()}
              value={value ? dayjs(value).toDate() : undefined}
              required
            />
          )}
        />

        <TimeInput
          label="Start time"
          placeholder="Pick start time"
          icon={<IconClock size="1rem" />}
          {...register('startTime')}
          required
        />

        {!checked && (
          <Controller
            control={control}
            name="validThrough"
            render={({ field: { onChange, value } }) => (
              <DatePickerInput
                valueFormat="DD MMM YYYY"
                label="Recurrent untill"
                placeholder="Select end date"
                description="Only select a date if you want to repeat this event more than once"
                icon={<IconRotateClockwise size="1rem" />}
                mt={'sm'}
                onChange={(value) => {
                  onChange(dayjs(value).format(DATE_TIME_FORMAT));
                }}
                minDate={dayjs().toDate()}
                value={value ? dayjs(value).toDate() : undefined}
              />
            )}
          />
        )}

        <Controller
          control={control}
          name="duration"
          render={({ field: { onChange, value } }) => (
            <Select
              placeholder="Duration"
              data={durationArr}
              onChange={onChange}
              value={value ? value.toString() : undefined}
              label="Duration"
              required
            />
          )}
        />
        <div
          style={{
            marginTop: '16px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Checkbox
            label="Every week"
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
          />
        </div>

        <div className={classes.actionButtons}>
          <Divider />
          <Button className={classes.button} type="submit">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};
