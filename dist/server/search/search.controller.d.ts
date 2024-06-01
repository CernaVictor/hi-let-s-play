import { SearchDto } from './dto/search.dto';
import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    findAll(searchParams: SearchDto): Promise<import("../sport-centers/entities/sport-center.entity").SportCenter[]>;
}
