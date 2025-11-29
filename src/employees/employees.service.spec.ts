import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { ObjectLiteral, Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';

type MockRepository<T extends ObjectLiteral = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

const createMockRepository = (): MockRepository => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  softRemove: jest.fn(),
});

describe('EmployeesService', () => {
  let service: EmployeesService;
  let repository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        {
          provide: getRepositoryToken(Employee),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
    repository = module.get<MockRepository>(getRepositoryToken(Employee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create an employee successfully', async () => {
      const dto: CreateEmployeeDto = {
        firstName: 'Jorge',
        lastNamePaternal: 'Urquiza',
        lastNameMaternal: 'Contreras',
        birthDate: '1996-03-30',
        email: 'jorge.employee@example.com',
        phoneNumber: '70000000',
        ci: '5432956',
        hireDate: '2024-01-01',
        position: 'Developer',
        baseSalary: 8000,
      };

      const createdEmployee = {
        id: 1,
        firstName: dto.firstName,
        lastNamePaternal: dto.lastNamePaternal,
        lastNameMaternal: dto.lastNameMaternal,
        birthDate: dto.birthDate ? new Date(dto.birthDate as string) : null,
        email: dto.email,
        phoneNumber: dto.phoneNumber,
        ci: dto.ci,
        hireDate: new Date(dto.hireDate as string),
        position: dto.position,
        baseSalary: dto.baseSalary,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as Employee;

      repository.create!.mockReturnValue(createdEmployee);
      repository.save!.mockResolvedValue(createdEmployee);

      const result = await service.create(dto);

      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: dto.firstName,
          lastNamePaternal: dto.lastNamePaternal,
          lastNameMaternal: dto.lastNameMaternal,
          email: dto.email,
          phoneNumber: dto.phoneNumber,
          ci: dto.ci,
          position: dto.position,
          baseSalary: dto.baseSalary,
          birthDate: expect.any(Date),
          hireDate: expect.any(Date),
        }),
      );
      expect(repository.save).toHaveBeenCalledWith(createdEmployee);
      expect(result).toEqual(createdEmployee);
    });
  });

  describe('findAll', () => {
    it('should return an array of employees', async () => {
      const employees: Employee[] = [
        {
          id: 1,
          firstName: 'Jorge',
          lastNamePaternal: 'Urquiza',
          lastNameMaternal: 'Contreras',
          birthDate: new Date('1996-03-30'),
          email: 'jorge.employee@example.com',
          phoneNumber: '70000000',
          ci: '5432956',
          hireDate: new Date('2024-01-01'),
          position: 'Developer',
          baseSalary: 8000,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];

      repository.find!.mockResolvedValue(employees);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(employees);
    });
  });

  describe('findOne', () => {
    it('should return an employee if it exists', async () => {
      const employee: Employee = {
        id: 1,
        firstName: 'Jorge',
        lastNamePaternal: 'Urquiza',
        lastNameMaternal: 'Contreras',
        birthDate: new Date('1996-03-30'),
        email: 'jorge.employee@example.com',
        phoneNumber: '70000000',
        ci: '5432956',
        hireDate: new Date('2024-01-01'),
        position: 'Developer',
        baseSalary: 8000,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      repository.findOne!.mockResolvedValue(employee);

      const result = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(employee);
    });

    it('should throw NotFoundException if employee does not exist', async () => {
      repository.findOne!.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });

  describe('update', () => {
    it('should update an existing employee', async () => {
      const existingEmployee: Employee = {
        id: 1,
        firstName: 'Jorge',
        lastNamePaternal: 'Urquiza',
        lastNameMaternal: 'Contreras',
        birthDate: new Date('1996-03-30'),
        email: 'jorge.employee@example.com',
        phoneNumber: '70000000',
        ci: '5432956',
        hireDate: new Date('2024-01-01'),
        position: 'Developer',
        baseSalary: 8000,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      const dto: UpdateEmployeeDto = {
        position: 'Senior Developer',
        baseSalary: 12000,
      };

      const updatedEmployee = {
        ...existingEmployee,
        ...dto,
      } as Employee;

      repository.findOne!.mockResolvedValue(existingEmployee);
      repository.save!.mockResolvedValue(updatedEmployee);

      const result = await service.update(1, dto);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.save).toHaveBeenCalledWith({
        ...existingEmployee,
        ...dto,
      });
      expect(result).toEqual(updatedEmployee);
    });
  });

  describe('remove', () => {
    it('should soft delete an existing employee', async () => {
      const existingEmployee: Employee = {
        id: 1,
        firstName: 'Jorge',
        lastNamePaternal: 'Urquiza',
        lastNameMaternal: 'Contreras',
        birthDate: new Date('1996-03-30'),
        email: 'jorge.employee@example.com',
        phoneNumber: '70000000',
        ci: '5432956',
        hireDate: new Date('2024-01-01'),
        position: 'Developer',
        baseSalary: 8000,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      repository.findOne!.mockResolvedValue(existingEmployee);
      repository.softRemove!.mockResolvedValue(existingEmployee);

      const result = await service.remove(1);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.softRemove).toHaveBeenCalledWith(existingEmployee);
      expect(result).toEqual({ message: 'Employee #1 deleted' });
    });
  });
});
