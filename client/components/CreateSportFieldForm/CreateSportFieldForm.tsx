import { Button, Select, Switch, Textarea, TextInput } from '@mantine/core';
import { IconSoccerField } from '@tabler/icons-react';
import { Controller, useForm } from 'react-hook-form';
import { useSportsApi } from '../../hooks/useSportsApi';
import { SportField } from '../../types/types';
import { useStyles } from './CreateSportFieldFormStyles';

type Props = {
  onSubmit: (inputs: SportField) => void;
};

export const CreateSportFieldForm = ({ onSubmit }: Props) => {
  const { control, register, handleSubmit, reset } =
    useForm<Omit<SportField, 'id'>>();
  const sports = useSportsApi();

  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Name"
        placeholder="Sport field's name"
        icon={<IconSoccerField size="1rem" />}
        {...register('name', { required: true })}
        required
      />
      <Controller
        control={control}
        name="sport"
        render={({ field: { onChange, value } }) => (
          <Select
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
      <Textarea
        label="Description"
        placeholder="Short description..."
        {...register('description', { required: true })}
        required
        autosize
        minRows={3}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '10px',
          marginBottom: '10px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '42.5%',
          }}
        >
          <Switch label="Covered" {...register('isCovered')} />
          <Switch
            label="Heated"
            {...register('isHeated')}
            style={{ marginTop: '5px' }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '42.5%',
          }}
        >
          <Switch label="Indoor" {...register('isIndoor')} />
          <Switch
            label="Iluminated"
            {...register('isIluminated')}
            style={{ marginTop: '5px' }}
          />
        </div>
      </div>

      <div className={classes.classes.actionButtons}>
        <Button className={classes.classes.buttonReset} onClick={() => reset()}>
          Reset
        </Button>
        <Button className={classes.classes.button} type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};
