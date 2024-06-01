import { Session } from 'next-auth';
import { UseSessionOptions } from 'next-auth/react';
export declare const useSession: (sessionOptions?: UseSessionOptions<boolean>) => {
    data: (Session & {
        user?: {
            isSportsCenterOwner?: boolean | undefined;
        } | undefined;
    }) | null;
    status: "loading" | "authenticated" | "unauthenticated";
};
