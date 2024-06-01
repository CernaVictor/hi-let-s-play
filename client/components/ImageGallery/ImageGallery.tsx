import { Group, Text, useMantineTheme, SimpleGrid } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import {
  Dropzone,
  DropzoneProps,
  FileWithPath,
  IMAGE_MIME_TYPE,
} from '@mantine/dropzone';
import { Photo } from '../../types/types';
import { ImageGalleryItem } from './components/ImageGalleryItem';

type FilePickerProps = Partial<DropzoneProps> & {
  photos: Photo[];
  onRemoveImage: (index: number) => void;
  onImagesAdded: (files: FileWithPath[]) => void;
};

export function ImageGallery({
  photos,
  onRemoveImage,
  onImagesAdded,
  ...props
}: FilePickerProps) {
  const theme = useMantineTheme();

  const handleFileDrop = (files: FileWithPath[]) => {
    onImagesAdded(files);
  };

  return (
    <div style={{ flex: 1 }}>
      <Dropzone onDrop={handleFileDrop} accept={IMAGE_MIME_TYPE} {...props}>
        <Group position="center" spacing="xl" style={{ pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <IconUpload
              size="3.2rem"
              stroke={1.5}
              color={
                theme.colors[theme.primaryColor][
                  theme.colorScheme === 'dark' ? 4 : 6
                ]
              }
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size="3.2rem"
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size="3.2rem" stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
      <SimpleGrid
        cols={4}
        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
        mt={photos.length > 0 ? 'xl' : 0}
      >
        {photos.map((file, index) => (
          <ImageGalleryItem
            key={file.id}
            image={file}
            onRemove={() => onRemoveImage(index)}
          />
        ))}
      </SimpleGrid>
    </div>
  );
}
