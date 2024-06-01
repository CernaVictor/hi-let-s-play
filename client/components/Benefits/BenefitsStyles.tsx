'use client';
import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  wrapper: {
    marginTop: '50px',
    marginBottom: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  card: {
    width: '350px',
  },

  btn: {
    backgroundColor: theme.colors.orange[2],
    '&:hover': {
      backgroundColor: theme.colors.orange[1],
    },
  },

  icon: {
    height: '50px',
    width: '50px',
  },
}));
