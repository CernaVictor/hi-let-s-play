import { Module } from '@nestjs/common';
import { ActivePeriodsService } from './active-periods.service';
import { ActivePeriodsController } from './active-periods.controller';
import { ActivePeriod } from './entities/active-period.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ActivePeriodsController],
  providers: [ActivePeriodsService],
  imports: [TypeOrmModule.forFeature([ActivePeriod])],
})
export class ActivePeriodsModule {}
