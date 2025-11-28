import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'employees' })
@Unique('ux_employees_email', ['email'])
@Unique('ux_employees_ci', ['ci'])
export class Employee {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ name: 'first_name', type: 'varchar', length: 100 })
  firstName: string;

  @Column({ name: 'last_name_paternal', type: 'varchar', length: 100 })
  lastNamePaternal: string;

  @Column({
    name: 'last_name_maternal',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  lastNameMaternal?: string;

  @Column({ name: 'birth_date', type: 'date', nullable: true })
  birthDate?: Date | null;

  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  phoneNumber?: string;

  @Column({ type: 'varchar', length: 20 })
  ci: string;

  @Column({ name: 'hire_date', type: 'date' })
  hireDate: Date;

  @Column({ type: 'varchar', length: 100 })
  position: string;

  @Column({
    name: 'base_salary',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  baseSalary?: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt?: Date | null;
}
