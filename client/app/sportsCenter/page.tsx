'use client';

import { Divider } from '@mantine/core';
import dynamic from 'next/dynamic';
import { AdminCentersGrid } from '../../components/AdminCentersGrid/AdminCentersGrid';
import { LoadingDiv } from '../../components/LoadingDiv/LoadingDiv';

const StatisticsTab = dynamic(
  () => import('../../components/StatisticsTab/StatisticsTab'),
  {
    loading: () => <LoadingDiv height={500} />,
    ssr: false,
  },
);

export default function SportsCenter() {
  return (
    <div>
      <Divider my="lg" label="Centers" labelPosition="center" />
      <AdminCentersGrid />
      <Divider my="lg" label="Statistics" labelPosition="center"></Divider>
      <StatisticsTab />
    </div>
  );
}
