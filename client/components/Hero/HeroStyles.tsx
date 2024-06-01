'use client';
import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  heroWrapper: {
    height: '90vh',
    width: '100vw',
    backgroundColor: '#DFF7FF',
  },
  searchFormWrapper: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    marginTop: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  heroImg: {
    objectFit: 'contain',
    height: '90vh',
    width: '100vw',
    padding: '100px',
  },
}));
