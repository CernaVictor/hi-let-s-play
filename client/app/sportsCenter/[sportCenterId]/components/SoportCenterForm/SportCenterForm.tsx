import {
  Button,
  Grid,
  NumberInput,
  Textarea,
  TextInput,
  Accordion,
} from '@mantine/core';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import {
  useGetSportCenterById,
  useUpdateSportCenter,
} from '../../../../../hooks/useSportCentersApi';
import { SportCenter } from '../../../../../types/types';

import { IconListDetails, IconClock, IconPhoto } from '@tabler/icons-react';
import { ImageGallery } from '../../../../../components/ImageGallery/ImageGallery';
import { FileWithPath } from '@mantine/dropzone';
import { DayOfTheWeekSelect } from '../../../../../components/DayOfTheWeekSelect/DayOfTheWeekSelect';
import { DATE_FORMAT } from '../../../../../../common/constants';

type SportCenterFormProps = {
  sportCenterId: string;
};

export const SportCenterForm = (props: SportCenterFormProps) => {
  const { isFetching, data: sportCenter } = useGetSportCenterById(
    props.sportCenterId,
    ['offBusinessHours'],
    true,
  );

  if (isFetching) return <div>Loading...</div>;
  if (sportCenter) return <Form sportCenter={sportCenter} />;
  return null;
};

const Form = ({ sportCenter }: { sportCenter: SportCenter }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { dirtyFields, isDirty },
  } = useForm<Omit<SportCenter, 'id'>>({
    defaultValues: sportCenter,
  });

  const {
    fields: offBusinessHours,
    append: appendOffBusinessHours,
    remove: removeOffBusinessHours,
  } = useFieldArray({
    control,
    name: 'offBusinessHours.activePeriods',
  });

  const {
    fields: imageGallery,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: 'imageGallery',
  });

  const { mutate: updateSportCenter, isLoading: isUpdatingSportCenter } =
    useUpdateSportCenter(sportCenter.id);

  const onSubmit = (arg: SportCenter) => {
    const formData = new FormData();
    Object.keys(dirtyFields).forEach((key: keyof typeof dirtyFields) => {
      if (typeof arg[key] === 'object') {
        formData.append(key, JSON.stringify(arg[key]));
      } else {
        formData.append(key, arg[key] as string);
      }
    });
    if (dirtyFields['imageGallery']?.length) {
      arg['imageGallery']
        .map((el) => el.file)
        .filter((el) => !!el)
        .forEach((file) => {
          //@ts-ignore
          formData.append('files', file);
        });
    }

    updateSportCenter(formData);
  };

  const handleImagesAdded = async (files: FileWithPath[]) => {
    const urls = files.map((file) => ({
      id: '',
      url: URL.createObjectURL(file),
      file,
    }));

    appendImage(urls);
  };

  return (
    <form
      // style={{ paddingRight: 20, paddingLeft: 20, marginTop: 20 }}
      style={{
        width: '75%',
        margin: 'auto',
        marginTop: '20px',
        marginBottom: '20px',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Accordion
        variant="contained"
        radius="md"
        multiple
        defaultValue={['details']}
      >
        <Grid>
          <Grid.Col>
            <Accordion.Item value="details">
              <Accordion.Control icon={<IconListDetails />}>
                Details
              </Accordion.Control>
              <Accordion.Panel>
                <Grid>
                  <Grid.Col xs={6}>
                    <TextInput
                      label="Name"
                      placeholder={`Name`}
                      {...register('name', { required: true })}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col xs={6}>
                    <TextInput
                      label="Phone number"
                      placeholder={`Phone number`}
                      {...register('phoneNumber', { required: true })}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Textarea
                      label="Description"
                      placeholder={`Description`}
                      {...register('description', { required: true })}
                      required
                      autosize
                      minRows={3}
                    />
                  </Grid.Col>
                  <Grid.Col xs={6}>
                    <TextInput
                      label="Country"
                      placeholder={`Country`}
                      {...register('country', { required: true })}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col xs={6}>
                    <TextInput
                      label="City"
                      placeholder={`City`}
                      {...register('city', { required: true })}
                      required
                    />
                  </Grid.Col>
                </Grid>
              </Accordion.Panel>
            </Accordion.Item>
          </Grid.Col>
          <Grid.Col>
            <Accordion.Item value="offBusinessHours">
              <Accordion.Control icon={<IconClock />}>
                Out of business hours
              </Accordion.Control>
              <Accordion.Panel>
                <Grid>
                  <Grid.Col>
                    {offBusinessHours.map((obh, index) => {
                      return (
                        <Grid key={obh.id}>
                          <Grid.Col md={'auto'} xs={12}>
                            <Controller
                              control={control}
                              rules={{
                                required: true,
                              }}
                              name={`offBusinessHours.activePeriods.${index}.dayOfTheWeek`}
                              render={({ field: { onChange, value } }) => (
                                <DayOfTheWeekSelect
                                  value={value}
                                  onChange={onChange}
                                />
                              )}
                            />
                          </Grid.Col>
                          <Grid.Col md={'auto'} xs={12}>
                            <TimeInput
                              label="Start time"
                              withAsterisk
                              {...register(
                                `offBusinessHours.activePeriods.${index}.startTime`,
                                {
                                  required: true,
                                },
                              )}
                            />
                          </Grid.Col>
                          <Grid.Col md={'auto'} xs={12}>
                            <Controller
                              control={control}
                              rules={{
                                required: true,
                              }}
                              name={`offBusinessHours.activePeriods.${index}.duration`}
                              render={({ field: { onChange, value, ref } }) => (
                                <NumberInput
                                  label="Duration in minutes"
                                  required
                                  onChange={onChange}
                                  value={value}
                                  ref={ref}
                                  hideControls
                                />
                              )}
                            />
                          </Grid.Col>
                          <Grid.Col md={'auto'} xs={12}>
                            <Controller
                              control={control}
                              rules={{
                                required: true,
                              }}
                              name={`offBusinessHours.activePeriods.${index}.validFrom`}
                              render={({ field: { onChange, value, ref } }) => (
                                <DatePickerInput
                                  label="Valid from"
                                  withAsterisk
                                  onChange={onChange}
                                  ref={ref}
                                  value={dayjs(value).toDate()}
                                />
                              )}
                            />
                          </Grid.Col>
                          <Grid.Col md={'auto'} xs={12}>
                            <Controller
                              control={control}
                              name={`offBusinessHours.activePeriods.${index}.validThrough`}
                              render={({ field: { onChange, value, ref } }) => (
                                <DatePickerInput
                                  label="Valid through"
                                  onChange={onChange}
                                  ref={ref}
                                  value={value ? dayjs(value).toDate() : null}
                                  allowDeselect
                                />
                              )}
                            />
                          </Grid.Col>
                          <Grid.Col>
                            <Button
                              onClick={() => removeOffBusinessHours(index)}
                            >
                              -
                            </Button>
                          </Grid.Col>
                        </Grid>
                      );
                    })}
                    <Grid.Col>
                      <Button
                        onClick={() =>
                          appendOffBusinessHours({
                            //@ts-ignore
                            dayOfTheWeek: undefined,
                            duration: 24 * 60,
                            startTime: '00:00',
                            validFrom: dayjs().format(DATE_FORMAT),
                            //@ts-ignore
                            validThrough: null,
                          })
                        }
                      >
                        Add
                      </Button>
                    </Grid.Col>
                  </Grid.Col>
                </Grid>
              </Accordion.Panel>
            </Accordion.Item>
          </Grid.Col>
          <Grid.Col>
            <Accordion.Item value="imageGallery">
              <Accordion.Control icon={<IconPhoto />}>
                Image galery
              </Accordion.Control>
              <Accordion.Panel>
                <Grid>
                  <ImageGallery
                    photos={imageGallery}
                    onRemoveImage={removeImage}
                    onImagesAdded={handleImagesAdded}
                  />
                </Grid>
              </Accordion.Panel>
            </Accordion.Item>
          </Grid.Col>
        </Grid>
      </Accordion>

      <Button
        type="submit"
        style={{ marginTop: 20 }}
        // uppercase
        disabled={!isDirty}
        loading={isUpdatingSportCenter}
        sx={{ backgroundColor: '#ea865f' }}
      >
        Save
      </Button>
    </form>
  );
};
