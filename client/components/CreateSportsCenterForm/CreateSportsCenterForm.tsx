import { Button, Textarea, TextInput } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { SportCenter } from '../../types/types';
import { PlacesAutocomplete } from '../PlacesAutocomplete/PlacesAutocomplete';
import React from 'react';
import { useStyles } from './CreateSportsCenterFormStyles';
import {
  IconSoccerField,
  IconBuildingSkyscraper,
  IconFlag,
  IconPhone,
  IconMapPin,
} from '@tabler/icons-react';

type Props = {
  onSubmit: (inputs: SportCenter) => void;
};

export const CreateSportsCenterForm = ({ onSubmit }: Props) => {
  const { register, handleSubmit, setValue, reset } = useForm<SportCenter>();

  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextInput
          label="Name"
          placeholder="Center Name"
          icon={<IconSoccerField size="1rem" />}
          {...register('name', { required: true })}
          required
        />
        <PlacesAutocomplete
          onSelectAddress={(address, latitude, longitude) => {
            setValue('address', address);
            latitude && setValue('latitude', latitude);
            longitude && setValue('longitude', longitude);
          }}
          label="Address"
          icon={<IconMapPin size="1rem" />}
          defaultValue=""
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextInput
            className={classes.classes.smallInput}
            label="Country"
            placeholder="Country"
            icon={<IconFlag size="1rem" />}
            {...register('country', { required: true })}
            required
          />
          <TextInput
            className={classes.classes.smallInput}
            label="City"
            placeholder="City"
            icon={<IconBuildingSkyscraper size="1rem" />}
            {...register('city', { required: true })}
            required
          />
        </div>
        <TextInput
          label="Phone number"
          type="tel"
          placeholder="Phone number"
          icon={<IconPhone size="1rem" />}
          {...register('phoneNumber', { required: true })}
          required
        />
        <Textarea
          label="Description"
          placeholder="Short description..."
          {...register('description', { required: true })}
          required
          autosize
          minRows={3}
        />
        <div className={classes.classes.actionButtons}>
          <Button
            className={classes.classes.buttonReset}
            onClick={() => reset()}
          >
            Reset
          </Button>
          <Button className={classes.classes.button} type="submit">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};
