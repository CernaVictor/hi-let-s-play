'use client';

import { Container } from '@mantine/core';
import { SportFieldCalendar } from '../../../../../components/SportFieldCalendar/SportFieldCalendar';

export default function SportFieldPage({
  params: { sportCenterId, sportFieldId },
}) {
  return (
    <Container p={24} size="xxl">
      <SportFieldCalendar
        sportFieldId={sportFieldId}
        sportCenterId={sportCenterId}
        calendarOptions={{
          height: undefined,
        }}
      />
    </Container>
  );
}
