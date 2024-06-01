import { useState } from 'react';
import { Photo } from '../../../types/types';
import { AspectRatio, Overlay, Image, ActionIcon } from '@mantine/core';

import { IconTrash } from '@tabler/icons-react';

type ImageGalleryItemProps = {
  image: Photo;
  onRemove: () => void;
};

export const ImageGalleryItem = ({
  image,
  onRemove,
}: ImageGalleryItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AspectRatio
      ratio={1}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      maw={300}
    >
      <Image src={image.url} alt={image.url} />
      {isHovered && (
        <Overlay color="#000" opacity={0.5}>
          <ActionIcon
            variant="filled"
            color="red"
            size="lg"
            radius="lg"
            onClick={onRemove}
          >
            <IconTrash />
          </ActionIcon>
        </Overlay>
      )}
    </AspectRatio>
  );
};
