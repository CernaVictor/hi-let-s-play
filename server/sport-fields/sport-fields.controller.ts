import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { SportFieldsService } from './sport-fields.service';
import { CreateSportFieldDto } from './dto/create-sport-field.dto';
import { UpdateSportFieldDto } from './dto/update-sport-field.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'server/auth/auth.guard';
import { AuthenticatedRequest } from 'common/types';

@Controller('sport-fields')
@ApiTags('sport-fields')
export class SportFieldsController {
  constructor(private readonly sportFieldsService: SportFieldsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createSportFieldDto: CreateSportFieldDto) {
    return this.sportFieldsService.create(createSportFieldDto);
  }

  @Get()
  findAll(
    @Req() req: AuthenticatedRequest,
    @Query('sportCenterId') sportCenterId: string,
  ) {
    const token = req.token?.sub ?? '';
    return this.sportFieldsService.findAll(sportCenterId, token);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sportFieldsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateSportFieldDto: UpdateSportFieldDto,
  ) {
    return this.sportFieldsService.update(id, updateSportFieldDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    if (!req.token?.sub) return null;
    return this.sportFieldsService.remove(id, req.token?.sub);
  }
}
