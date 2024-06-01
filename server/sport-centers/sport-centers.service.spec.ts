import { Test, TestingModule } from '@nestjs/testing';
import { SportCentersService } from './sport-centers.service';

describe('SportCentersService', () => {
  let service: SportCentersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SportCentersService],
    }).compile();

    service = module.get<SportCentersService>(SportCentersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
