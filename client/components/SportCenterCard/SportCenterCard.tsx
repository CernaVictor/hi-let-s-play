import { Card, Text, Badge, Button, Group } from '@mantine/core';
import { SportCenter } from '../../types/types';
import Link from 'next/link';
import { useStyles } from './SportCenterCardStyles';
import { IconTrash } from '@tabler/icons-react';
import { useDeleteSportCenter } from '../../hooks/useSportCentersApi';
import { Carousel } from '../Carousel/Carousel';

type SportCenterCardProps = {
  sportCenter: SportCenter;
};

export const SportCenterCard = ({ sportCenter }: SportCenterCardProps) => {
  const classes = useStyles();

  const deleteSportsCentersMutation = useDeleteSportCenter();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Carousel photos={sportCenter.imageGallery} />
      </Card.Section>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{sportCenter.name}</Text>
        <Badge color="green" variant="light">
          Open
        </Badge>
      </Group>

      <Text
        size="sm"
        color="dimmed"
        style={{ height: '70px', overflow: 'auto' }}
      >
        {sportCenter.description}
      </Text>

      <div className={classes.classes.buttonsWrapper}>
        <Link
          className={classes.classes.link}
          href={`sportsCenter/${sportCenter.id}`}
        >
          <Button
            className={classes.classes.button}
            fullWidth
            mt="md"
            radius="md"
          >
            Check out center
          </Button>
        </Link>
        <Button
          className={classes.classes.buttonDelete}
          mt="md"
          radius="md"
          onClick={() => deleteSportsCentersMutation.mutate(sportCenter.id)}
        >
          <IconTrash />
        </Button>
      </div>
    </Card>
  );
};
