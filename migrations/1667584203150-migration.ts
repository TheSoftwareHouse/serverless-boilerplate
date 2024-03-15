import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1667584203150 implements MigrationInterface {
  name = "migration1667584203150";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "example-model" ("id" character varying NOT NULL, "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, CONSTRAINT "PK_531218052145e12c28736ad2e86" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`INSERT INTO "example-model"(id, "firstName", "lastName", email) VALUES ('bc3a9e05-893d-4589-8190-3d31c2db75b4', 'John', 'Doe', 'john@doe.com'), ('90a0742d-ced4-4356-b91f-e7bad03f3eca', 'Mark', 'Smith', 'mark@smith.com')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "example-model"`);
  }
}
