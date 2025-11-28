import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { MeasurementUnit } from './entities/measurement-unit.entity';
import { CreateMeasurementUnitDto } from './dto/create-measurement-unit.dto';
import { UpdateMeasurementUnitDto } from './dto/update-measurement-unit.dto';

@Injectable()
export class MeasurementUnitsService {
  constructor(
    @InjectRepository(MeasurementUnit)
    private readonly measurementUnitRepository: Repository<MeasurementUnit>,
  ) {}

  create(dto: CreateMeasurementUnitDto) {
    const entity = this.measurementUnitRepository.create(dto);
    return this.measurementUnitRepository.save(entity);
  }

  findAll() {
    return this.measurementUnitRepository.find({
      where: { deletedAt: IsNull() },
    });
  }

  async findOne(id: number) {
    const unit = await this.measurementUnitRepository.findOne({
      where: { id },
    });
    if (!unit) {
      throw new NotFoundException(`MeasurementUnit #${id} not found`);
    }
    return unit;
  }

  async update(id: number, dto: UpdateMeasurementUnitDto) {
    const unit = await this.findOne(id);
    Object.assign(unit, dto);
    return this.measurementUnitRepository.save(unit);
  }

  async remove(id: number) {
    const unit = await this.findOne(id);
    await this.measurementUnitRepository.softRemove(unit);
    return { message: `MeasurementUnit #${id} deleted` };
  }
}
