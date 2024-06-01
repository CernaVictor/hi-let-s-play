'use client';
import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  wrapper: {
    // marginTop: '50px',
    paddingTop: '75px',
    height: '300px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#2C2C2C',
  },

  divider: {
    width: '70px',
  },

  footerContentRow: {
    display: 'flex',
    marginTop: '5px',
  },

  footerContentRowItem: {
    marginLeft: '10px',
  },

  footerContentRowIconItem: {
    marginLeft: '20px',
  },

  contentWrapper: {
    marginTop: '15px',
  },
}));
