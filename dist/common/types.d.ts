import { JWT } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
export declare type DayOfTheWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export declare type AuthenticatedRequest = NextRequest & {
    token: JWT;
};
