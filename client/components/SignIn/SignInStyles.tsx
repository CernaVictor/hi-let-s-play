'use client';
import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor: theme.colors.orange[2],
    '&:hover': {
      backgroundColor: theme.colors.orange[1],
    },
  },
  buttonReddirect: {
    color: theme.colors.orange[2],
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: theme.colors.orange[1],
    },
  },

  input: {
    marginTop: '10px',
  },

  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  checkboxWrapper: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },

  submitButtonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },

  redirectWrapper: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },

  inputWrapper: {
    marginTop: '40px',
  },
}));
