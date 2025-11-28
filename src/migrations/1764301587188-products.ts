import { MigrationInterface, QueryRunner } from 'typeorm';

export class Products1764301587188 implements MigrationInterface {
  name = 'Products1764301587188';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`products\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(150) NOT NULL, \`sku\` varchar(50) NOT NULL, \`description\` varchar(255) NULL, \`price\` decimal(10,2) NOT NULL, \`stock\` int UNSIGNED NOT NULL DEFAULT '0', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`measurement_unit_id\` int UNSIGNED NULL, UNIQUE INDEX \`ux_products_sku\` (\`sku\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_3c6bc52ec3da3d20774865a72ee\` FOREIGN KEY (\`measurement_unit_id\`) REFERENCES \`measurement_units\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_3c6bc52ec3da3d20774865a72ee\``,
    );
    await queryRunner.query(`DROP INDEX \`ux_products_sku\` ON \`products\``);
    await queryRunner.query(`DROP TABLE \`products\``);
  }
}
