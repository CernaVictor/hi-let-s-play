import { Body, Controller, Get, Post } from '@nestjs/common';
import { SportsService } from './sports.service';

@Controller('sports')
export class SportsController {
  constructor(private readonly sportsService: SportsService) {}

  @Get()
  findAll() {
    return this.sportsService.findAll();
  }

  @Post()
  create(@Body() sports: string[]) {
    return this.sportsService.create(sports);
  }
}
