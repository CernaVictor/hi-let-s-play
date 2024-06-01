import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActivePeriodsService } from './active-periods.service';
import { CreateActivePeriodDto } from './dto/create-active-period.dto';
import { UpdateActivePeriodDto } from './dto/update-active-period.dto';

@Controller('active-periods')
@ApiTags('active-periods')
export class ActivePeriodsController {
  constructor(private readonly activePeriodsService: ActivePeriodsService) {}

  @Post()
  create(@Body() createActivePeriodDto: CreateActivePeriodDto) {
    return this.activePeriodsService.create(createActivePeriodDto);
  }

  @Get()
  findAll() {
    return this.activePeriodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activePeriodsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateActivePeriodDto: UpdateActivePeriodDto,
  ) {
    return this.activePeriodsService.update(+id, updateActivePeriodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activePeriodsService.remove(+id);
  }
}
