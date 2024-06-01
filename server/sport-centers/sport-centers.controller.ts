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
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { SportCentersService } from './sport-centers.service';
import { CreateSportCenterDto } from './dto/create-sport-center.dto';
import { UpdateSportCenterDto } from './dto/update-sport-center.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'server/auth/auth.guard';
import { AuthenticatedRequest } from 'common/types';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('sport-centers')
@Controller('sport-centers')
export class SportCentersController {
  constructor(private readonly sportCentersService: SportCentersService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() createSportCenterDto: CreateSportCenterDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.token?.sub ?? '';
    return this.sportCentersService.create(createSportCenterDto, userId);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() req: AuthenticatedRequest) {
    const userId = req.token?.sub ?? '';
    return this.sportCentersService.findAll(userId);
  }

  @Get('statistics')
  @UseGuards(AuthGuard)
  getSportCenterStatistics(
    @Req() req: AuthenticatedRequest,
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string,
  ) {
    const userId = req.token?.sub ?? '';
    return this.sportCentersService.getSportCenterStatistics(
      userId,
      dateFrom,
      dateTo,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('fields') fields: string[]) {
    return this.sportCentersService.findOne(id, fields);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  update(
    @Param('id') id: string,
    @Body() updateSportCenterDto: UpdateSportCenterDto,
    @UploadedFiles() files: any[],
    @Req() req: AuthenticatedRequest,
  ) {
    if (!req.token?.sub) return null;
    return this.sportCentersService.update(
      id,
      updateSportCenterDto,
      files,
      req.token?.sub,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    if (!req.token?.sub) return null;
    return this.sportCentersService.remove(id, req.token?.sub);
  }
}
