import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}
  create(createCustomerDto: CreateCustomerDto) {
    const partial: Partial<Customer> = {
      firstName: createCustomerDto.firstName,
      lastNamePaternal: createCustomerDto.lastNamePaternal,
      lastNameMaternal: createCustomerDto.lastNameMaternal,
      birthDate: createCustomerDto.birthDate
        ? new Date(createCustomerDto.birthDate)
        : null,
      email: createCustomerDto.email,
      phoneNumber: createCustomerDto.phoneNumber,
      ci: createCustomerDto.ci,
      addressLine: createCustomerDto.addressLine,
      city: createCustomerDto.city,
      state: createCustomerDto.state,
      postalCode: createCustomerDto.postalCode,
    };

    const customer = this.customerRepository.create(partial);
    return this.customerRepository.save(customer);
  }

  findAll() {
    return this.customerRepository.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.findOne(id);

    if (updateCustomerDto.birthDate !== undefined) {
      customer.birthDate = updateCustomerDto.birthDate
        ? new Date(updateCustomerDto.birthDate)
        : null;
    }

    Object.assign(customer, {
      ...updateCustomerDto,
      birthDate: customer.birthDate,
    });

    return this.customerRepository.save(customer);
  }

  async remove(id: number) {
    const customer = await this.findOne(id);
    await this.customerRepository.softRemove(customer);
    return { message: `Customer #${id} deleted` };
  }
}
