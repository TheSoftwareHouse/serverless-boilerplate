import {MigrationInterface, QueryRunner} from "typeorm";

export class exampleMigration1605111464989 implements MigrationInterface {
    name = 'exampleMigration1605111464989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "example-model" ("id" character varying NOT NULL, "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, CONSTRAINT "PK_531218052145e12c28736ad2e86" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "example-model"`);
    }

}
