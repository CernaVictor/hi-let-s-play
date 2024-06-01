'use client';

import { Button, Title } from '@mantine/core';
import { SportFieldCalendar } from '../../../../../components/SportFieldCalendar/SportFieldCalendar';
import { useDeleteSportField } from '../../../../../hooks/useSportFieldApi';
import { SportField } from '../../../../../types/types';

type SportFieldComponentProps = {
  sportField: SportField;
  sportCenterId: string;
};

export const SportFieldComponent = (props: SportFieldComponentProps) => {
  const deleteSportField = useDeleteSportField(props.sportCenterId);

  const handleDeleteSportField = async () => {
    deleteSportField.mutate(props.sportField.id);
  };

  return (
    <div
      style={{
        marginBottom: 50,
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '75%', margin: 'auto' }}>
        {/* <Divider my="lg" label={props.sportField.name} labelPosition="center" /> */}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          {/* <Link
            href={`sportsCenter/${props.sportCenterId}/sportFields/${props.sportField.id}`}
          >
            {props.sportField.name}
          </Link> */}
          <Title order={1}>{props.sportField.name}</Title>
          <Button
            onClick={handleDeleteSportField}
            sx={{ backgroundColor: '#ea865f' }}
          >
            Delete
          </Button>
        </div>
        <SportFieldCalendar
          sportFieldId={props.sportField.id}
          sportCenterId={props.sportCenterId}
        />
      </div>
    </div>
  );
};
