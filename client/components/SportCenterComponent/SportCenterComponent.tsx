import { Carousel } from '@mantine/carousel';
import { Title, Text, AspectRatio, Spoiler, Image } from '@mantine/core';
import { useGetSportCenterById } from '../../hooks/useSportCentersApi';
import { useGetSportFields } from '../../hooks/useSportFieldApi';
import { SportFieldUserViewComponent } from '../SportFieldUserViewComponent/SportFieldUserViewComponent';
import './SportCenterComponentStyles.css';

export const SportCenterComponent = ({ sportCenterId }) => {
  const { data: sportCenterData } = useGetSportCenterById(
    sportCenterId,
    ['offBusinessHours'],
    true,
  );

  const sportFields = useGetSportFields(sportCenterId);

  return (
    <div className="component-wrapper">
      <Title order={2}>{sportCenterData?.name}</Title>
      <Text>{sportCenterData?.address}</Text>
      <div className="carousel-wrapper">
        {sportCenterData?.imageGallery.length ? (
          <Carousel mx="auto" withIndicators height={500} loop>
            {sportCenterData?.imageGallery.map((image) => (
              <Carousel.Slide key={image.id}>
                <AspectRatio ratio={1920 / 1080}>
                  <Image src={image.url} alt={image.url} fit="contain" />
                </AspectRatio>
              </Carousel.Slide>
            ))}
          </Carousel>
        ) : (
          <AspectRatio ratio={1920 / 1080} h={500}>
            <Image withPlaceholder fit="contain" alt="sportCenter" />
          </AspectRatio>
        )}
      </div>
      <Spoiler
        className="spoiler"
        maxHeight={120}
        showLabel="Show more"
        hideLabel="hide"
      >
        {sportCenterData?.description}
      </Spoiler>

      {sportFields.data?.map((sf) => (
        <SportFieldUserViewComponent
          key={sf.id}
          sportField={sf}
          sportCenterId={sportCenterId}
        />
      ))}
    </div>
  );
};
