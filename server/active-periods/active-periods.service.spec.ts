import { Test, TestingModule } from '@nestjs/testing';
import { ActivePeriodsService } from './active-periods.service';

describe('ActivePeriodsService', () => {
  let service: ActivePeriodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivePeriodsService],
    }).compile();

    service = module.get<ActivePeriodsService>(ActivePeriodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
