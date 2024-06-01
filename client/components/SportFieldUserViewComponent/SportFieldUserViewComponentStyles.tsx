'use client';
import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  componentWrapper: {
    marginBottom: '10px',
    marginTop: '40px',
  },

  fieldDetailsItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  fieldDetailsColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  fieldDetailsCardContent: {
    marginTop: '10px',
    width: '220px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  sportFieldTitleDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
}));
