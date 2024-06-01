import { Test, TestingModule } from '@nestjs/testing';
import { ActivePeriodsController } from './active-periods.controller';
import { ActivePeriodsService } from './active-periods.service';

describe('ActivePeriodsController', () => {
  let controller: ActivePeriodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivePeriodsController],
      providers: [ActivePeriodsService],
    }).compile();

    controller = module.get<ActivePeriodsController>(ActivePeriodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
