import { OnModuleInit } from '@nestjs/common';
import { NextServer } from 'next/dist/server/next';
export declare class ViewService implements OnModuleInit {
    private server;
    onModuleInit(): Promise<void>;
    getNextServer(): NextServer;
}
