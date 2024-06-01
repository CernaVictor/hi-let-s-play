import { Modal, Skeleton, Grid } from '@mantine/core';
import { SportCenterCard } from '../SportCenterCard/SportCenterCard';
import { AddSportCenterCard } from '../SportCenterCard/AddSportCenterCard';
import { useState } from 'react';
import { CreateSportsCenterForm } from '../CreateSportsCenterForm/CreateSportsCenterForm';
import {
  useCreateSportCenter,
  useGetSportCenters,
} from '../../hooks/useSportCentersApi';
import { SportCenter } from '../../types/types';
import { useStyles } from './AdminCentersGridStyles';

export const AdminCentersGrid = () => {
  const getSportsCenterQuery = useGetSportCenters();
  const createSportsCentersMutation = useCreateSportCenter();

  const [isCreateSportFieldModalOpen, setIsCreateSportFieldModalOpen] =
    useState(false);

  const toggleCreateSportFieldModal = () =>
    setIsCreateSportFieldModalOpen((prev) => !prev);

  const handleCreateNewSportCenter = (sportCenter: SportCenter) => {
    createSportsCentersMutation
      .mutateAsync(sportCenter)
      .then(toggleCreateSportFieldModal);
  };

  const classes = useStyles();

  return (
    <div className={classes.classes.GridWrapper}>
      <Skeleton visible={getSportsCenterQuery.isLoading}>
        <Grid m={10} columns={6}>
          <Grid.Col span={2}>
            <AddSportCenterCard
              toggleCreateSportFieldModal={toggleCreateSportFieldModal}
            />
          </Grid.Col>

          {getSportsCenterQuery.data?.map((sportCenter) => (
            <Grid.Col span={2} key={sportCenter.id}>
              <SportCenterCard sportCenter={sportCenter} />
            </Grid.Col>
          ))}
        </Grid>
      </Skeleton>

      <Modal
        opened={isCreateSportFieldModalOpen}
        onClose={toggleCreateSportFieldModal}
        style={{ overflow: 'hidden' }}
        title="Create a sport center"
      >
        <Modal.Body>
          <CreateSportsCenterForm onSubmit={handleCreateNewSportCenter} />
        </Modal.Body>
      </Modal>
    </div>
  );
};
