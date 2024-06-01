import { Test, TestingModule } from '@nestjs/testing';
import { SportCentersController } from './sport-centers.controller';
import { SportCentersService } from './sport-centers.service';

describe('SportCentersController', () => {
  let controller: SportCentersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SportCentersController],
      providers: [SportCentersService],
    }).compile();

    controller = module.get<SportCentersController>(SportCentersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
