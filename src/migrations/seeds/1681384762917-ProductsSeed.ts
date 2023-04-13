import { MigrationInterface, QueryRunner } from 'typeorm';
import { producrtsSeed } from './producrts.seed';

export class ProductsSeed1681384762917 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('Products')
      .values(producrtsSeed)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('Products')
      .execute();
  }
}
