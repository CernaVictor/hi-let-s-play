import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiTags } from '@nestjs/swagger';
import { CancelEventDto } from './dto/cancel-event-for-date.dto';
import { plainToInstance } from 'class-transformer';
import { AuthGuard } from 'server/auth/auth.guard';
import { AuthenticatedRequest } from 'common/types';

@Controller('events')
@ApiTags('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Req() req: AuthenticatedRequest,
    @Body() createEventDto: CreateEventDto,
  ) {
    if (!req.token?.sub) return null;
    return this.eventsService.create(createEventDto, req.token?.sub);
  }

  @Get()
  findAllEventsForSportField(
    @Query('sportFieldId') sportFieldId: string,
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string,
  ) {
    return this.eventsService.findAllEventsForSportField(
      sportFieldId,
      dateFrom,
      dateTo,
    );
  }

  @Get('userCalendar')
  @UseGuards(AuthGuard)
  getUserCalendarEvents(
    @Req() req: AuthenticatedRequest,
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string,
  ) {
    if (!req.token?.sub) return null;
    return this.eventsService.getUserCalendarEvents(
      req.token?.sub,
      dateFrom,
      dateTo,
    );
  }

  @Get('overlapping')
  getOverlappingEvents(@Query() event: CreateEventDto) {
    return this.eventsService.getOverlappingEvents(
      plainToInstance(CreateEventDto, event),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Put('cancel/:id')
  @UseGuards(AuthGuard)
  cancelEvent(
    @Param('id') id: string,
    @Body() cancelEventDto: CancelEventDto,
    @Req() req: AuthenticatedRequest,
  ) {
    if (!req.token?.sub) return null;
    return this.eventsService.cancelEvent(id, cancelEventDto, req.token?.sub);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    if (!req.token?.sub) return null;
    return this.eventsService.remove(id, req.token?.sub);
  }

  @Delete()
  removeAll() {
    return this.eventsService.deleteAll();
  }
}
