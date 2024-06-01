'use client';
import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor: theme.colors.orange[2],
    '&:hover': {
      backgroundColor: theme.colors.orange[1],
    },
  },
  buttonReset: {
    color: theme.colors.orange[2],
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: theme.colors.orange[1],
    },
  },

  actionButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
}));
