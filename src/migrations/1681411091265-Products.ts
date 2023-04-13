import { MigrationInterface, QueryRunner } from "typeorm";

export class Products1681411091265 implements MigrationInterface {
    name = 'Products1681411091265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Products" ("ProductID" SERIAL NOT NULL, "ProductType" character varying NOT NULL, "ProductName" character varying NOT NULL, "ProductWeight" character varying NOT NULL, "isSpicy" boolean NOT NULL, "isVegetarian" boolean NOT NULL, "ProductDescription" character varying NOT NULL, "UnitPrice" numeric NOT NULL, "SmallImagePath" character varying NOT NULL, "BigImagePath" character varying NOT NULL, CONSTRAINT "PK_07f84037390838453c1426c7cb5" PRIMARY KEY ("ProductID"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Products"`);
    }

}
