import { ActionIcon } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useStyles } from './AddSportCenterCardStyles';

export const AddSportCenterCard = (props) => {
  const classes = useStyles();
  return (
    <div
      className={classes.classes.wrapper}
      onClick={props.toggleCreateSportFieldModal}
    >
      <ActionIcon
        className={classes.classes.actionButton}
        variant="filled"
        size="lg"
        radius="lg"
      >
        <IconPlus />
      </ActionIcon>
      <span>Add sport center</span>
    </div>
  );
};
