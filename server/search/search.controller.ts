import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchDto } from './dto/search.dto';
import { SearchService } from './search.service';

@Controller('search')
@ApiTags('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  findAll(@Query() searchParams: SearchDto) {
    return this.searchService.findAvailableFields(searchParams);
  }
}
