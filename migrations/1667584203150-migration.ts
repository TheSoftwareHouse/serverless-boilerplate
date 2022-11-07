import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1667584203150 implements MigrationInterface {
  name = "migration1667584203150";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "example-model" ("id" character varying NOT NULL, "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, CONSTRAINT "PK_531218052145e12c28736ad2e86" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "example-model"`);
  }
}
