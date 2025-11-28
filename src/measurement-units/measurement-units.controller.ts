import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MeasurementUnitsService } from './measurement-units.service';
import { CreateMeasurementUnitDto } from './dto/create-measurement-unit.dto';
import { UpdateMeasurementUnitDto } from './dto/update-measurement-unit.dto';

@Controller('measurement-units')
export class MeasurementUnitsController {
  constructor(
    private readonly measurementUnitsService: MeasurementUnitsService,
  ) {}

  @Post()
  create(@Body() createMeasurementUnitDto: CreateMeasurementUnitDto) {
    return this.measurementUnitsService.create(createMeasurementUnitDto);
  }

  @Get()
  findAll() {
    return this.measurementUnitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.measurementUnitsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMeasurementUnitDto: UpdateMeasurementUnitDto,
  ) {
    return this.measurementUnitsService.update(+id, updateMeasurementUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.measurementUnitsService.remove(+id);
  }
}
