import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasurementUnitsModule } from './measurement-units/measurement-units.module';
import { ProductModule } from './product/product.module';
import { EmployeesModule } from './employees/employees.module';
import { ConfigModule } from '@nestjs/config';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'user',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'mdeis-db',
      autoLoadEntities: true,
      synchronize: false,
    }),
    MeasurementUnitsModule,
    ProductModule,
    EmployeesModule,
    CustomersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
