import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sport } from './entities/sport.entity';

@Injectable()
export class SportsService {
  constructor(
    @InjectRepository(Sport)
    private sportsRepository: Repository<Sport>,
  ) {}

  findAll() {
    return this.sportsRepository.find();
  }

  create(sports: string[]) {
    return this.sportsRepository.save(
      sports.map((name) => this.sportsRepository.create({ name })),
    );
  }
}
