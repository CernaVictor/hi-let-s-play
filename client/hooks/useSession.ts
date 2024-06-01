import { Session } from 'next-auth';
import {
  useSession as nextAuthUseSession,
  UseSessionOptions,
} from 'next-auth/react';

export const useSession = (sessionOptions?: UseSessionOptions<boolean>) => {
  const { data, status } = nextAuthUseSession(sessionOptions);

  const typedData:
    | (Session & { user?: { isSportsCenterOwner?: boolean } })
    | null = data;

  return {
    data: typedData,
    status,
  };
};
