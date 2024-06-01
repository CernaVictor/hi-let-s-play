'use client';
import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  actionButton: {
    backgroundColor: theme.colors.blue[2],
    '&:hover': {
      backgroundColor: theme.colors.orange[1],
    },
    color: 'black',
  },
  wrapper: {
    border: 'dashed',
    borderColor: 'gray',
    height: '100%',
    borderRadius: '10px',
    borderWidth: '1px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
}));
