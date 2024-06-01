import { Carousel as MantineCarousel } from '@mantine/carousel';
import { AspectRatio, Image } from '@mantine/core';
import { Photo } from '../../types/types';

type CarouselProps = {
  photos: Photo[];
};

export const Carousel = ({ photos }: CarouselProps) => {
  return photos.length ? (
    <MantineCarousel mx="auto" withIndicators height={200}>
      {photos.map((photo) => (
        <MantineCarousel.Slide key={photo.id}>
          <AspectRatio ratio={1920 / 1080}>
            <Image
              src={photo.url}
              alt={photo.url}
              fit="contain"
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </AspectRatio>
        </MantineCarousel.Slide>
      ))}
    </MantineCarousel>
  ) : (
    <AspectRatio ratio={1920 / 1080} h={200}>
      <Image withPlaceholder fit="contain" alt="placeholder" />
    </AspectRatio>
  );
};
