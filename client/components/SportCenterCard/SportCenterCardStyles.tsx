'use client';
import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  buttonsWrapper: {
    display: 'flex',
  },
  button: {
    backgroundColor: theme.colors.blue[2],
    '&:hover': {
      backgroundColor: theme.colors.orange[1],
    },
    color: 'black',
  },

  buttonDelete: {
    backgroundColor: theme.colors.blue[2],
    '&:hover': {
      backgroundColor: theme.colors.orange[1],
    },
    marginLeft: '5px',
    color: 'black',
  },

  link: {
    textDecoration: 'none',
    color: 'black',
    flexGrow: 1,
  },
}));
