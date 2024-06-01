import { Button, Grid } from '@mantine/core';
import dayjs from 'dayjs';
import { DATE_FORMAT, TIME_FORMAT } from '../../../../../common/constants';
import { DayOfTheWeek } from '../../../../../common/types';
import { useCreateEvent } from '../../../../hooks/useEventsApi';
import { useSession } from '../../../../hooks/useSession';
import { SearchDTO, SportFieldWithSuggestions } from '../../../../types/types';
import { useStyles } from './SearchSportFieldCardStyles';

export const SearchSportFieldCard = ({
  sportField,
  searchParams,
}: {
  sportField: SportFieldWithSuggestions;
  searchParams: SearchDTO;
}) => {
  const { data } = useSession();
  const { mutate: createSportFieldEvent } = useCreateEvent(sportField.id);
  const { classes } = useStyles();

  const onSuggestionPress = (suggestion: {
    startDate: string;
    endDate: string;
  }) => {
    const dayOfTheWeek = dayjs(suggestion.startDate).day() as DayOfTheWeek;
    const duration = Number(searchParams.duration);
    const startTime = dayjs(suggestion.startDate).format(TIME_FORMAT);
    const validFrom = dayjs(suggestion.startDate).format(DATE_FORMAT);
    const nextDayAfterStartDay = dayjs(suggestion.startDate)
      .add(1, 'day')
      .startOf('day');
    const validThrough = (
      nextDayAfterStartDay.isAfter(suggestion.endDate)
        ? nextDayAfterStartDay
        : dayjs(suggestion.endDate).add(1, 'day').startOf('day')
    ).format(DATE_FORMAT);

    createSportFieldEvent({
      bookerName: data?.user?.name ?? 'unknown',
      startTime,
      dayOfTheWeek,
      duration,
      validFrom,
      validThrough,
    });
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column' }}
      key={sportField.id}
    >
      <div
        style={{
          marginBottom: '10px',
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        <Grid gutter={1} columns={3} align="center">
          {sportField.suggestions.map((suggestion) => {
            return (
              <Grid.Col
                span={1}
                key={suggestion.startDate + suggestion.endDate}
              >
                <Button
                  className={classes.button}
                  mt={'xs'}
                  key={`${suggestion.startDate}-${suggestion.endDate}`}
                  onClick={() => onSuggestionPress(suggestion)}
                >
                  {dayjs(suggestion.startDate).format(TIME_FORMAT)}-
                  {dayjs(suggestion.endDate).format(TIME_FORMAT)}
                </Button>
              </Grid.Col>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};
