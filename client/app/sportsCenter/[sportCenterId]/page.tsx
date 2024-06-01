'use client';

import { useState } from 'react';
import { Button, Divider, Modal, Space, Title } from '@mantine/core';
import {
  useCreateSportField,
  useGetSportFields,
} from '../../../hooks/useSportFieldApi';
import { CreateSportFieldForm } from '../../../components/CreateSportFieldForm/CreateSportFieldForm';
import { SportField } from '../../../types/types';
import { SportCenterForm } from './components/SoportCenterForm/SportCenterForm';
import { SportFieldComponent } from './components/SportFieldComponent/SportFieldComponent';
import {
  useDeleteSportCenter,
  useGetSportCenterById,
} from '../../../hooks/useSportCentersApi';

export default function SportsCenter({ params: { sportCenterId } }) {
  const sportFields = useGetSportFields(sportCenterId);
  const createSportField = useCreateSportField(sportCenterId);

  const { data: sportCenter } = useGetSportCenterById(
    sportCenterId,
    ['offBusinessHours'],
    true,
  );

  // if (isFetching) return <div>Loading...</div>;

  const [isCreateSportFieldModalOpen, setIsCreateSportFieldModalOpen] =
    useState(false);

  const { mutate: deleteSportCenter } = useDeleteSportCenter();

  const toggleCreateSportFieldModal = () =>
    setIsCreateSportFieldModalOpen((prev) => !prev);

  const handleCreateNewSportField = (sportField: SportField) => {
    createSportField.mutateAsync(sportField).then(toggleCreateSportFieldModal);
  };

  const handleDeleteSportCenter = async () => {
    deleteSportCenter(sportCenterId);
    //delete message + navigate to sport centers page
  };

  return (
    <div>
      <div style={{ width: '75%', margin: 'auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '20px',
          }}
        >
          <Title order={1}>{sportCenter?.name}</Title>
          <div style={{ display: 'flex' }}>
            <Button
              onClick={toggleCreateSportFieldModal}
              sx={{ backgroundColor: '#ea865f' }}
            >
              Create sport field
            </Button>
            <Space w="xs" />
            <Button
              onClick={handleDeleteSportCenter}
              sx={{ backgroundColor: '#ea865f' }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      <Modal
        title="Create a sport field"
        opened={isCreateSportFieldModalOpen}
        onClose={toggleCreateSportFieldModal}
      >
        <CreateSportFieldForm onSubmit={handleCreateNewSportField} />
      </Modal>

      {/* <Grid gutter={4}>
        <Grid.Col md={6} xs={12}>
          <SportCenterForm sportCenterId={sportCenterId} />
        </Grid.Col>
        <Grid.Col md={6} xs={12}>
          {sportFields.data?.map((sf) => (
            <SportFieldComponent
              key={sf.id}
              sportField={sf}
              sportCenterId={sportCenterId}
            />
          ))}
        </Grid.Col>
      </Grid> */}
      <SportCenterForm sportCenterId={sportCenterId} />
      <Divider
        my="lg"
        label={'Fields'}
        labelPosition="center"
        style={{ width: '75%', margin: 'auto' }}
      />
      {sportFields.data?.map((sf) => (
        <SportFieldComponent
          key={sf.id}
          sportField={sf}
          sportCenterId={sportCenterId}
        />
      ))}
    </div>
  );
}
