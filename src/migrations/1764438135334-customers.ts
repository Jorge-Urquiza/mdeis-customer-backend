import { MigrationInterface, QueryRunner } from "typeorm";

export class Customers1764438135334 implements MigrationInterface {
    name = 'Customers1764438135334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`customers\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(100) NOT NULL, \`last_name_paternal\` varchar(100) NOT NULL, \`last_name_maternal\` varchar(100) NULL, \`birth_date\` date NULL, \`email\` varchar(150) NOT NULL, \`phone_number\` varchar(20) NULL, \`ci\` varchar(20) NOT NULL, \`address_line\` varchar(200) NULL, \`city\` varchar(100) NULL, \`state\` varchar(100) NULL, \`postal_code\` varchar(20) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, UNIQUE INDEX \`ux_customers_ci\` (\`ci\`), UNIQUE INDEX \`ux_customers_email\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`ux_customers_email\` ON \`customers\``);
        await queryRunner.query(`DROP INDEX \`ux_customers_ci\` ON \`customers\``);
        await queryRunner.query(`DROP TABLE \`customers\``);
    }

}
