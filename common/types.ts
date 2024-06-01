import { JWT } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export type DayOfTheWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type AuthenticatedRequest = NextRequest & { token: JWT };
