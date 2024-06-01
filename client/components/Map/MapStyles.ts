import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  divWrapper: {
    display: 'block',
    overflow: 'hidden',
    position: 'sticky',
    height: 'calc(100vh - 7rem)',
    width: 'calc(40%)',
    marginLeft: '20px',
  },

  divWrapperSportCenterPageView: {
    display: 'block',
    overflow: 'hidden',
    position: 'sticky',
    height: 'calc(100vh - 7rem)',
    width: 'calc(100% - 55vw)',
    marginLeft: '20px',
  },
}));
