import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MeasurementUnit } from '../../measurement-units/entities/measurement-unit.entity';

@Entity({ name: 'products' })
@Index('ux_products_sku', ['sku'], { unique: true })
export class Product {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  sku: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  stock: number;

  @ManyToOne(() => MeasurementUnit, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
    eager: true,
  })
  
  @JoinColumn({ name: 'measurement_unit_id' })
  measurementUnit: MeasurementUnit;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt?: Date | null;
}
