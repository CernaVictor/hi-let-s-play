import { Skeleton, SkeletonProps } from '@mantine/core';
import { useStyles } from './LoadingDivStyles';

export const LoadingDiv = (height: SkeletonProps) => {
  const classes = useStyles();
  return (
    <Skeleton
      height={height.height}
      className={classes.classes.SkeletonWrapper}
    />
  );
};
