import { Test, TestingModule } from '@nestjs/testing';
import { MeasurementUnitsService } from './measurement-units.service';

describe('MeasurementUnitsService', () => {
  let service: MeasurementUnitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeasurementUnitsService],
    }).compile();

    service = module.get<MeasurementUnitsService>(MeasurementUnitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
