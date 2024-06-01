import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { EventsModule } from 'server/events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivePeriod } from 'server/active-periods/entities/active-period.entity';
import { SportCenter } from 'server/sport-centers/entities/sport-center.entity';
import { SportCentersModule } from 'server/sport-centers/sport-centers.module';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [
    EventsModule,
    SportCentersModule,
    TypeOrmModule.forFeature([Event, ActivePeriod, SportCenter]),
  ],
})
export class SearchModule {}
