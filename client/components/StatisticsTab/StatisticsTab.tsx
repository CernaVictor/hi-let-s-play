import { Tabs, Grid, Skeleton } from '@mantine/core';
import { AreaChart } from '../AreaChart/AreaChart';
import { BarChart } from '../BarChart/BarChart';
import { useStyles } from './StatisticsTabStyles';
import { useGetSportCentersStatistics } from '../../hooks/useSportCentersApi';
import { useState } from 'react';
import { DATE_FORMAT } from '../../../common/constants';
import dayjs from 'dayjs';

export default function StatisticsTab() {
  const [dates, setDates] = useState({
    startDate: dayjs().startOf('month').format(DATE_FORMAT),
    endDate: dayjs().add(1, 'month').startOf('month').format(DATE_FORMAT),
  });

  const classes = useStyles();

  const statistics = useGetSportCentersStatistics(
    dates.startDate,
    dates.endDate,
  );

  const handleSetDates = (period: string) => {
    if (period !== 'month' && period !== 'year')
      setDates({ startDate: '', endDate: '' });
    else
      setDates({
        startDate: dayjs().startOf(period).format(DATE_FORMAT),
        endDate: dayjs().endOf(period).format(DATE_FORMAT),
      });
  };
  if (!statistics.data) return null;
  return (
    <div className={classes.classes.TabWrapper}>
      <Skeleton visible={statistics.isLoading}>
        <Tabs defaultValue="month">
          <Tabs.List grow>
            <Tabs.Tab value="month" onClick={() => handleSetDates('month')}>
              This month
            </Tabs.Tab>
            <Tabs.Tab value="year" onClick={() => handleSetDates('year')}>
              This year
            </Tabs.Tab>
            {/* <Tabs.Tab
            value="beginning"
            onClick={() => handleSetDates('beginning')}
          >
            From beginning
          </Tabs.Tab> */}
          </Tabs.List>

          <Tabs.Panel value="month" pt="xs">
            <Grid gutter="xl" m={10} columns={4} justify="center">
              <Grid.Col span={2}>
                <BarChart chartData={statistics.data} dataKey="nrOfEvents" />
              </Grid.Col>
              <Grid.Col span={2}>
                <BarChart chartData={statistics.data} dataKey="nrOfUsers" />
              </Grid.Col>
              <Grid.Col span={2}>
                <AreaChart chartData={statistics.data} />
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="year" pt="xs">
            <Grid gutter="xl" m={10} columns={4} justify="center">
              <Grid.Col span={2}>
                <BarChart chartData={statistics.data} dataKey="nrOfEvents" />
              </Grid.Col>
              <Grid.Col span={2}>
                <BarChart chartData={statistics.data} dataKey="nrOfUsers" />
              </Grid.Col>
              <Grid.Col span={2}>
                <AreaChart chartData={statistics.data} />
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          {/* <Tabs.Panel value="beginning" pt="xs">
          <Grid gutter="xl" m={10} columns={4} justify="center">
            <Grid.Col span={2}>
              <BarChart chartData={statistics.data} dataKey="nrOfEvents" />
            </Grid.Col>
            <Grid.Col span={2}>
              <BarChart chartData={statistics.data} dataKey="nrOfUsers" />
            </Grid.Col>
            <Grid.Col span={2}>
              <AreaChart chartData={statistics.data} />
            </Grid.Col>
          </Grid>
        </Tabs.Panel> */}
        </Tabs>
      </Skeleton>
    </div>
  );
}
