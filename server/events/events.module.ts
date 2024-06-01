import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  SportFieldEvent,
  Event,
  OffBusinessHours,
} from './entities/event.entity';
import { ActivePeriod } from 'server/active-periods/entities/active-period.entity';
import { SportCenter } from 'server/sport-centers/entities/sport-center.entity';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [
    TypeOrmModule.forFeature([
      SportCenter,
      Event,
      ActivePeriod,
      OffBusinessHours,
      SportFieldEvent,
    ]),
  ],
  exports: [EventsService],
})
export class EventsModule {}
