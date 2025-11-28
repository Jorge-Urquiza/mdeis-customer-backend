import { MigrationInterface, QueryRunner } from "typeorm";

export class Employees1764304142060 implements MigrationInterface {
    name = 'Employees1764304142060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`employees\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(100) NOT NULL, \`last_name_paternal\` varchar(100) NOT NULL, \`last_name_maternal\` varchar(100) NULL, \`birth_date\` date NULL, \`email\` varchar(150) NOT NULL, \`phone_number\` varchar(20) NULL, \`ci\` varchar(20) NOT NULL, \`hire_date\` date NOT NULL, \`position\` varchar(100) NOT NULL, \`base_salary\` decimal(10,2) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, UNIQUE INDEX \`ux_employees_ci\` (\`ci\`), UNIQUE INDEX \`ux_employees_email\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`ux_employees_email\` ON \`employees\``);
        await queryRunner.query(`DROP INDEX \`ux_employees_ci\` ON \`employees\``);
        await queryRunner.query(`DROP TABLE \`employees\``);
    }

}
