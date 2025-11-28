import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { MeasurementUnit } from 'src/measurement-units/entities/measurement-unit.entity';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create({
      name: createProductDto.name,
      sku: createProductDto.sku,
      description: createProductDto.description,
      price: createProductDto.price,
      stock: createProductDto.stock,
      measurementUnit: {
        id: createProductDto.measurementUnitId,
      } as MeasurementUnit,
    });

    return this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find({
      where: { deletedAt: IsNull() },
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);

    if (updateProductDto.measurementUnitId) {
      (product as any).measurementUnit = {
        id: updateProductDto.measurementUnitId,
      } as MeasurementUnit;
      delete (updateProductDto as any).measurementUnitId;
    }

    Object.assign(product, updateProductDto);

    return this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    await this.productRepository.softRemove(product);
    return { message: `Product #${id} deleted` };
  }
}
