import { MigrationInterface, QueryRunner } from "typeorm";

export class MeasurementUnits1764299207022 implements MigrationInterface {
    name = 'MeasurementUnits1764299207022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`measurement_units\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`code\` varchar(20) NOT NULL, \`name\` varchar(100) NOT NULL, \`description\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, UNIQUE INDEX \`IDX_36ef885b06f0c2e112dd4538df\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_36ef885b06f0c2e112dd4538df\` ON \`measurement_units\``);
        await queryRunner.query(`DROP TABLE \`measurement_units\``);
    }

}
