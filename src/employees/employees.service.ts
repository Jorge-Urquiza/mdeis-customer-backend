import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    const partial: Partial<Employee> = {
      firstName: createEmployeeDto.firstName,
      lastNamePaternal: createEmployeeDto.lastNamePaternal,
      lastNameMaternal: createEmployeeDto.lastNameMaternal,
      birthDate: createEmployeeDto.birthDate
        ? new Date(createEmployeeDto.birthDate)
        : null,
      email: createEmployeeDto.email,
      phoneNumber: createEmployeeDto.phoneNumber,
      ci: createEmployeeDto.ci,
      hireDate: new Date(createEmployeeDto.hireDate),
      position: createEmployeeDto.position,
      baseSalary: createEmployeeDto.baseSalary,
    };

    const employee = this.employeeRepository.create(partial);
    return this.employeeRepository.save(employee);
  }

  findAll() {
    return this.employeeRepository.find({
      where: { deletedAt: IsNull() },
    });
  }

  async findOne(id: number) {
    const employee = await this.employeeRepository.findOne({
      where: { id },
    });
    if (!employee) {
      throw new NotFoundException(`Employee #${id} not found`);
    }
    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.findOne(id);

    if (updateEmployeeDto.birthDate !== undefined) {
      employee.birthDate = updateEmployeeDto.birthDate
        ? new Date(updateEmployeeDto.birthDate)
        : null;
    }

    if (updateEmployeeDto.hireDate !== undefined) {
      employee.hireDate = new Date(updateEmployeeDto.hireDate);
    }

    Object.assign(employee, {
      ...updateEmployeeDto,
      birthDate: employee.birthDate,
      hireDate: employee.hireDate,
    });

    return this.employeeRepository.save(employee);
  }

  async remove(id: number) {
    const employee = await this.findOne(id);
    await this.employeeRepository.softRemove(employee);
    return { message: `Employee #${id} deleted` };
  }
}
