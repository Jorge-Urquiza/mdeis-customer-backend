import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { MeasurementUnit } from './src/measurement-units/entities/measurement-unit.entity';
import { Product } from './src/product/entities/product.entity';
import { Employee } from './src/employees/entities/employee.entity';

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'mdeis-db',
  entities: [MeasurementUnit, Product, Employee],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});

export default dataSource;
