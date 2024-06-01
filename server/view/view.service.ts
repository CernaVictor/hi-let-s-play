import { Injectable, OnModuleInit } from '@nestjs/common';
import * as next from 'next';
import { NextServer } from 'next/dist/server/next';

@Injectable()
export class ViewService implements OnModuleInit {
  private server: NextServer;

  async onModuleInit(): Promise<void> {
    try {
      //@ts-expect-error
      this.server = next({
        dev: process.env.NODE_ENV !== 'production',
        dir: './client',
        customServer: true,
      });
      await this.server.prepare();
    } catch (error) {
      console.log(error);
    }
  }

  getNextServer(): NextServer {
    return this.server;
  }
}
