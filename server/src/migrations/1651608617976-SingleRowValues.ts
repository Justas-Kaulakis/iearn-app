import { MigrationInterface, QueryRunner } from "typeorm";

export class SingleRowValues1651608617976 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'INSERT INTO `social_links`(`id`, `instagram`, `facebook`, `youtube`, `iearnGlobal`) VALUES (DEFAULT, "", "", "", "")'
    );
    await queryRunner.query(
      'INSERT INTO `contacts`(`contact`) VALUES (""), (""), (""), ("")'
    );
    await queryRunner.query(
      'INSERT INTO `about`(`id`, `content`, `imageUrl`) VALUES (DEFAULT, "", "")'
    );
    await queryRunner.query(
      'INSERT INTO `article`(`id`, `body`) VALUES (DEFAULT, "")'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("TRUNCATE `social_links`");
    await queryRunner.query("TRUNCATE `contacts`");
    await queryRunner.query("TRUNCATE `about`");
    await queryRunner.query("TRUNCATE `article`");
  }
}
