'use client';
import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  button: {
    marginTop: '25px',
    backgroundColor: theme.colors.orange[2],
    '&:hover': {
      backgroundColor: theme.colors.orange[1],
    },
  },

  input: {
    backgroundColor: '#dff6ff',
    color: 'black',
    borderColor: 'black',
  },

  label: {
    backgroundColor: 'red',
  },

  datePickerRoot: {
    width: '150px',
  },

  sportInputRoot: {
    width: '150px',
  },
}));
