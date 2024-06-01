import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  AspectRatio,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { SportCenter } from '../../types/types';
import Link from 'next/link';
import { useStyles } from './BrowseSportCenterCardStyles';
import { useGetSportFields } from '../../hooks/useSportFieldApi';

type BrowseSportCenterCardProps = {
  sportCenter: SportCenter;
};

export const BrowseSportCenterCard = ({
  sportCenter,
}: BrowseSportCenterCardProps) => {
  const classes = useStyles();

  const sportFields = useGetSportFields(sportCenter.id);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        {sportCenter.imageGallery.length ? (
          <Carousel mx="auto" withIndicators height={200}>
            {sportCenter.imageGallery.map((image) => (
              <Carousel.Slide key={image.id}>
                <AspectRatio ratio={1920 / 1080}>
                  <Image src={image.url} alt={image.url} fit="contain" />
                </AspectRatio>
              </Carousel.Slide>
            ))}
          </Carousel>
        ) : (
          <AspectRatio ratio={1920 / 1080} h={200}>
            <Image withPlaceholder fit="contain" alt="asdf" />
          </AspectRatio>
        )}
      </Card.Section>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{sportCenter.name}</Text>
        <Badge color="green" variant="light">
          Open
        </Badge>
      </Group>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '50px',
          overflow: 'auto',
        }}
      >
        {sportFields.data?.map((sf) => (
          <div key={sf.id}>
            <Text>{sf.name}</Text>
            <div>
              <Badge color="green" variant="light">
                10:00 - 12:00
              </Badge>
              <Badge color="green" variant="light">
                12:00 - 14:00
              </Badge>
            </div>
          </div>
        ))}
      </div>

      <div className={classes.classes.buttonsWrapper}>
        <Link
          className={classes.classes.link}
          href={`browseCenters/${sportCenter.id}`}
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
      </div>
    </Card>
  );
};
