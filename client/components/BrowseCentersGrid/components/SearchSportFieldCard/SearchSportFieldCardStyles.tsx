'use client';
import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor: theme.colors.orange[2],
    '&:hover': {
      backgroundColor: theme.colors.orange[1],
    },
  },
}));
