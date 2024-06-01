'use client';

import { UserCalendar } from '../../components/UserCalendar/UserCalendar';
import { Container } from '@mantine/core';

export default function CalendarPage() {
  return (
    <Container size={'xl'} pt={20}>
      <UserCalendar />
    </Container>
  );
}
