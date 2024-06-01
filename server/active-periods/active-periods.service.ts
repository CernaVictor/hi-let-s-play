import { Injectable } from '@nestjs/common';
import { CreateActivePeriodDto } from './dto/create-active-period.dto';
import { UpdateActivePeriodDto } from './dto/update-active-period.dto';

@Injectable()
export class ActivePeriodsService {
  create(createActivePeriodDto: CreateActivePeriodDto) {
    return 'This action adds a new activePeriod';
  }

  findAll() {
    return `This action returns all activePeriods`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activePeriod`;
  }

  update(id: number, updateActivePeriodDto: UpdateActivePeriodDto) {
    return `This action updates a #${id} activePeriod`;
  }

  remove(id: number) {
    return `This action removes a #${id} activePeriod`;
  }
}
