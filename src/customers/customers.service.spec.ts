import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { ObjectLiteral, Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';

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

describe('CustomersService', () => {
  let service: CustomersService;
  let repository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(Customer),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    repository = module.get<MockRepository>(getRepositoryToken(Customer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a customer successfully', async () => {
      const dto: CreateCustomerDto = {
        firstName: 'Luis',
        lastNamePaternal: 'Perez',
        lastNameMaternal: 'Gomez',
        birthDate: '1990-05-10',
        email: 'luis.customer@example.com',
        phoneNumber: '70123456',
        ci: '7894561',
        addressLine: 'Av. Banzer 4to anillo',
        city: 'Santa Cruz',
        state: 'Santa Cruz',
        postalCode: 'SCZ001',
      };

      const createdCustomer = {
        id: 1,
        firstName: dto.firstName,
        lastNamePaternal: dto.lastNamePaternal,
        lastNameMaternal: dto.lastNameMaternal,
        birthDate: dto.birthDate ? new Date(dto.birthDate) : null,
        email: dto.email,
        phoneNumber: dto.phoneNumber,
        ci: dto.ci,
        addressLine: dto.addressLine,
        city: dto.city,
        state: dto.state,
        postalCode: dto.postalCode,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as Customer;

      repository.create!.mockReturnValue(createdCustomer);
      repository.save!.mockResolvedValue(createdCustomer);

      const result = await service.create(dto);

      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: dto.firstName,
          lastNamePaternal: dto.lastNamePaternal,
          lastNameMaternal: dto.lastNameMaternal,
          email: dto.email,
          phoneNumber: dto.phoneNumber,
          ci: dto.ci,
          addressLine: dto.addressLine,
          city: dto.city,
          state: dto.state,
          postalCode: dto.postalCode,
          birthDate: expect.any(Date),
        }),
      );
      expect(repository.save).toHaveBeenCalledWith(createdCustomer);
      expect(result).toEqual(createdCustomer);
    });
  });

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      const customers: Customer[] = [
        {
          id: 1,
          firstName: 'Luis',
          lastNamePaternal: 'Perez',
          lastNameMaternal: 'Gomez',
          birthDate: new Date('1990-05-10'),
          email: 'luis.customer@example.com',
          phoneNumber: '70123456',
          ci: '7894561',
          addressLine: 'Av. Banzer 4to anillo',
          city: 'Santa Cruz',
          state: 'Santa Cruz',
          postalCode: 'SCZ001',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];

      repository.find!.mockResolvedValue(customers);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(customers);
    });
  });

  describe('findOne', () => {
    it('should return a customer if it exists', async () => {
      const customer: Customer = {
        id: 1,
        firstName: 'Luis',
        lastNamePaternal: 'Perez',
        lastNameMaternal: 'Gomez',
        birthDate: new Date('1990-05-10'),
        email: 'luis.customer@example.com',
        phoneNumber: '70123456',
        ci: '7894561',
        addressLine: 'Av. Banzer 4to anillo',
        city: 'Santa Cruz',
        state: 'Santa Cruz',
        postalCode: 'SCZ001',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      repository.findOne!.mockResolvedValue(customer);

      const result = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(customer);
    });

    it('should throw NotFoundException if customer does not exist', async () => {
      repository.findOne!.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });

  describe('update', () => {
    it('should update an existing customer', async () => {
      const existingCustomer: Customer = {
        id: 1,
        firstName: 'Luis',
        lastNamePaternal: 'Perez',
        lastNameMaternal: 'Gomez',
        birthDate: new Date('1990-05-10'),
        email: 'luis.customer@example.com',
        phoneNumber: '70123456',
        ci: '7894561',
        addressLine: 'Av. Banzer 4to anillo',
        city: 'Santa Cruz',
        state: 'Santa Cruz',
        postalCode: 'SCZ001',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      const dto: UpdateCustomerDto = {
        phoneNumber: '70999999',
        city: 'La Paz',
      };

      const updatedCustomer = {
        ...existingCustomer,
        ...dto,
      } as Customer;

      repository.findOne!.mockResolvedValue(existingCustomer);
      repository.save!.mockResolvedValue(updatedCustomer);

      const result = await service.update(1, dto);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.save).toHaveBeenCalledWith({
        ...existingCustomer,
        ...dto,
      });
      expect(result).toEqual(updatedCustomer);
    });
  });

  describe('remove', () => {
    it('should soft delete an existing customer', async () => {
      const existingCustomer: Customer = {
        id: 1,
        firstName: 'Luis',
        lastNamePaternal: 'Perez',
        lastNameMaternal: 'Gomez',
        birthDate: new Date('1990-05-10'),
        email: 'luis.customer@example.com',
        phoneNumber: '70123456',
        ci: '7894561',
        addressLine: 'Av. Banzer 4to anillo',
        city: 'Santa Cruz',
        state: 'Santa Cruz',
        postalCode: 'SCZ001',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      repository.findOne!.mockResolvedValue(existingCustomer);
      repository.softRemove!.mockResolvedValue(existingCustomer);

      const result = await service.remove(1);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.softRemove).toHaveBeenCalledWith(existingCustomer);
      expect(result).toEqual({ message: 'Customer #1 deleted' });
    });
  });
});
