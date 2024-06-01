import { Module } from '@nestjs/common';
import { ViewModule } from './view/view.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { SportFieldsModule } from './sport-fields/sport-fields.module';
import { ActivePeriodsModule } from './active-periods/active-periods.module';
import { EventsModule } from './events/events.module';
import { SearchModule } from './search/search.module';
import { SportCentersModule } from './sport-centers/sport-centers.module';
import { ConfigModule } from '@nestjs/config';
import { FileUploadModule } from './file-upload/file-upload.module';
import { SportsModule } from './sports/sports.module';

export const apiModuleList = [
  UsersModule,
  SportCentersModule,
  SportFieldsModule,
  ActivePeriodsModule,
  EventsModule,
  SearchModule,
  SportsModule,
];

@Module({
  imports: [
    ...apiModuleList,
    RouterModule.register([
      {
        path: 'api',
        children: apiModuleList,
      },
    ]),
    ViewModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'hlp_database',
      autoLoadEntities: true,
      synchronize: true,
      migrationsTableName: 'custom_migration_table',
      migrations: ['./server/migrations/*.js'],
      migrationsRun: true,
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    FileUploadModule,
  ],
})
export class AppModule {}
