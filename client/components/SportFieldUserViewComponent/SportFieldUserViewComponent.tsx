'use client';

import { Text, Title, Card, Space } from '@mantine/core';
import { SportFieldCalendar } from '../SportFieldCalendar/SportFieldCalendar';
import { SportField } from '../../types/types';
import {
  IconFlame,
  IconLamp2,
  IconHome,
  IconUmbrella,
} from '@tabler/icons-react';
import { useStyles } from './SportFieldUserViewComponentStyles';

type SportFieldComponentProps = {
  sportField: SportField;
  sportCenterId: string;
};

export const SportFieldUserViewComponent = (
  props: SportFieldComponentProps,
) => {
  const { classes } = useStyles();

  return (
    <div className={classes.componentWrapper}>
      <div className={classes.sportFieldTitleDetails}>
        <div>
          <Title order={2}>{props.sportField.name}</Title>
          <Text>{props.sportField.sport.name}</Text>
        </div>
        <Card withBorder shadow="sm" radius="md">
          <Card.Section withBorder inheritPadding py="xs">
            <Text>Field Details</Text>
          </Card.Section>

          <div className={classes.fieldDetailsCardContent}>
            <div className={classes.fieldDetailsColumn}>
              {props.sportField.isCovered ? (
                <div className={classes.fieldDetailsItem}>
                  <IconUmbrella />
                  <Text size="sm">Covered</Text>
                </div>
              ) : (
                <div className={classes.fieldDetailsItem}>
                  <IconUmbrella />
                  <Text size="sm" td={'line-through'}>
                    Covered
                  </Text>
                </div>
              )}
              {props.sportField.isHeated ? (
                <div className={classes.fieldDetailsItem}>
                  <IconFlame />
                  <Text size="sm">Heated</Text>
                </div>
              ) : (
                <div className={classes.fieldDetailsItem}>
                  <IconFlame />
                  <Text td={'line-through'} size="sm">
                    Heated
                  </Text>
                </div>
              )}
            </div>
            <Space w={50} />
            <div>
              {props.sportField.isIluminated ? (
                <div className={classes.fieldDetailsItem}>
                  <IconLamp2 />
                  <Text size="sm">Illuminated</Text>
                </div>
              ) : (
                <div className={classes.fieldDetailsItem}>
                  <IconLamp2 />
                  <Text size="sm" td={'line-through'}>
                    Illuminated
                  </Text>
                </div>
              )}
              {props.sportField.isIndoor ? (
                <div className={classes.fieldDetailsItem}>
                  <IconHome />
                  <Text size="sm">Indoor</Text>
                </div>
              ) : (
                <div className={classes.fieldDetailsItem}>
                  <IconHome />
                  <Text size="sm" td={'line-through'}>
                    Indoor
                  </Text>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      <SportFieldCalendar
        sportFieldId={props.sportField.id}
        sportCenterId={props.sportCenterId}
      />
    </div>
  );
};
