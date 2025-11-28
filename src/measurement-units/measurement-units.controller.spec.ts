import { Test, TestingModule } from '@nestjs/testing';
import { MeasurementUnitsController } from './measurement-units.controller';
import { MeasurementUnitsService } from './measurement-units.service';

describe('MeasurementUnitsController', () => {
  let controller: MeasurementUnitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeasurementUnitsController],
      providers: [MeasurementUnitsService],
    }).compile();

    controller = module.get<MeasurementUnitsController>(MeasurementUnitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
