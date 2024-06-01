'use client';
import React from 'react';
import { Button, Group, Select, Flex } from '@mantine/core';
import Sports from '../../assets/sports.json';
import { useStyles } from './SearchFormStyles';
import { IconSearch } from '@tabler/icons-react';
import { DateTimePicker } from '@mantine/dates';
import { PlacesAutocomplete } from '../PlacesAutocomplete/PlacesAutocomplete';
import { Controller, useForm } from 'react-hook-form';
import { SearchDTO } from '../../types/types';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '../../../common/constants';
import { useSportsApi } from '../../hooks/useSportsApi';

type SearchFormProps = {
  defaultValues?: SearchDTO;
  onSearchPress: (values: SearchDTO) => void;
};

export const SearchForm = (props: SearchFormProps) => {
  const sports = useSportsApi();
  const { control, setValue, getValues } = useForm<SearchDTO>({
    defaultValues: props.defaultValues,
  });

  const classes = useStyles();

  return (
    <Group position="center" spacing="xs" align="center" noWrap>
      <PlacesAutocomplete
        onSelectAddress={(address, latitude, longitude) => {
          setValue('address', address);
          setValue('latitude', latitude?.toString() ?? '');
          setValue('longitude', longitude?.toString() ?? '');
        }}
        classNames={{
          input: classes.classes.input,
        }}
        defaultValue={getValues('address') ?? ''}
        label="Address"
      />
      <Controller
        control={control}
        name="sport"
        render={({ field: { onChange, value } }) => (
          <Select
            classNames={{
              root: classes.classes.sportInputRoot,
              input: classes.classes.input,
            }}
            placeholder="Sport"
            nothingFound="No options"
            data={
              sports.data?.map((sport) => ({
                label: sport.name,
                value: sport.id,
              })) ?? []
            }
            onChange={onChange}
            value={value}
            label="Sport"
            required
          />
        )}
      />
      <Controller
        control={control}
        name="intervalStart"
        render={({ field: { onChange, value } }) => (
          <DateTimePicker
            classNames={{
              root: classes.classes.datePickerRoot,
              input: classes.classes.input,
            }}
            placeholder="Date"
            onChange={(value) => {
              onChange(dayjs(value).format(DATE_TIME_FORMAT));
            }}
            minDate={dayjs().toDate()}
            value={
              !!value && value !== 'undefined'
                ? dayjs(value).toDate()
                : undefined
            }
            label="Interval start"
            required
          />
        )}
      />
      <Controller
        control={control}
        name="intervalEnd"
        render={({ field: { onChange, value } }) => (
          <DateTimePicker
            classNames={{
              root: classes.classes.datePickerRoot,
              input: classes.classes.input,
            }}
            placeholder="Date"
            onChange={(value) =>
              onChange(dayjs(value).format(DATE_TIME_FORMAT))
            }
            minDate={dayjs().toDate()}
            value={
              !!value && value !== 'undefined'
                ? dayjs(value).toDate()
                : undefined
            }
            label="Interval end"
            required
          />
        )}
      />
      <Controller
        control={control}
        name="duration"
        render={({ field: { onChange, value } }) => (
          <Select
            classNames={{
              root: classes.classes.sportInputRoot,
              input: classes.classes.input,
            }}
            placeholder="Duration"
            data={[
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
            ]}
            onChange={onChange}
            value={value}
            label="Duration"
            required
          />
        )}
      />
      <Button
        className={classes.classes.button}
        onClick={() => props.onSearchPress(getValues())}
      >
        <IconSearch />
      </Button>
    </Group>
  );
};
