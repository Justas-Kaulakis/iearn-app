import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1644785307332 implements MigrationInterface {
  name = "Initial1644785307332";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `iearn`.`about` (`id` int NOT NULL AUTO_INCREMENT, `content` text NOT NULL, `imageUrl` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `iearn`.`admin` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `iearn`.`contacts` (`id` int NOT NULL AUTO_INCREMENT, `contact` varchar(255) NULL DEFAULT '', PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `iearn`.`gallery_image` (`id` int NOT NULL AUTO_INCREMENT, `imageUrl` varchar(255) NOT NULL, `description` varchar(255) NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `iearn`.`generation_image` (`id` int NOT NULL AUTO_INCREMENT, `imageUrl` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `generationId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `iearn`.`article` (`id` int NOT NULL AUTO_INCREMENT, `body` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `iearn`.`project` (`id` int NOT NULL AUTO_INCREMENT, `body` text NOT NULL, `title` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `imageUrl` varchar(255) NOT NULL DEFAULT '', `isPublished` tinyint NOT NULL, `wasPublished` tinyint NOT NULL DEFAULT 0, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `publishedAt` timestamp NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `iearn`.`generation` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `description` text NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `iearn`.`member` (`id` int NOT NULL AUTO_INCREMENT, `fullName` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `imageUrl` varchar(255) NOT NULL DEFAULT '', `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `iearn`.`project_image` (`id` int NOT NULL AUTO_INCREMENT, `imageName` varchar(255) NOT NULL, `projectId` int NOT NULL, `isFromHistory` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `iearn`.`social_links` (`id` int NOT NULL AUTO_INCREMENT, `instagram` varchar(255) NULL DEFAULT '', `facebook` varchar(255) NULL DEFAULT '', `youtube` varchar(255) NULL DEFAULT '', `iearnGlobal` varchar(255) NULL DEFAULT '', PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `iearn`.`project_generation_generation` (`projectId` int NOT NULL, `generationId` int NOT NULL, INDEX `IDX_381ffc731351b2d43d2377bf64` (`projectId`), INDEX `IDX_9aefcdf8052e5960828b6c1291` (`generationId`), PRIMARY KEY (`projectId`, `generationId`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "ALTER TABLE `iearn`.`generation_image` ADD CONSTRAINT `FK_29f5769c7fadc28fd2adea65e0a` FOREIGN KEY (`generationId`) REFERENCES `iearn`.`generation`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `iearn`.`project_generation_generation` ADD CONSTRAINT `FK_381ffc731351b2d43d2377bf64f` FOREIGN KEY (`projectId`) REFERENCES `iearn`.`project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE"
    );
    await queryRunner.query(
      "ALTER TABLE `iearn`.`project_generation_generation` ADD CONSTRAINT `FK_9aefcdf8052e5960828b6c12917` FOREIGN KEY (`generationId`) REFERENCES `iearn`.`generation`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `iearn`.`project_generation_generation` DROP FOREIGN KEY `FK_9aefcdf8052e5960828b6c12917`"
    );
    await queryRunner.query(
      "ALTER TABLE `iearn`.`project_generation_generation` DROP FOREIGN KEY `FK_381ffc731351b2d43d2377bf64f`"
    );
    await queryRunner.query(
      "ALTER TABLE `iearn`.`generation_image` DROP FOREIGN KEY `FK_29f5769c7fadc28fd2adea65e0a`"
    );
    await queryRunner.query(
      "DROP INDEX `IDX_9aefcdf8052e5960828b6c1291` ON `iearn`.`project_generation_generation`"
    );
    await queryRunner.query(
      "DROP INDEX `IDX_381ffc731351b2d43d2377bf64` ON `iearn`.`project_generation_generation`"
    );
    await queryRunner.query(
      "DROP TABLE `iearn`.`project_generation_generation`"
    );
    await queryRunner.query("DROP TABLE `iearn`.`social_links`");
    await queryRunner.query("DROP TABLE `iearn`.`project_image`");
    await queryRunner.query("DROP TABLE `iearn`.`member`");
    await queryRunner.query("DROP TABLE `iearn`.`generation`");
    await queryRunner.query("DROP TABLE `iearn`.`project`");
    await queryRunner.query("DROP TABLE `iearn`.`article`");
    await queryRunner.query("DROP TABLE `iearn`.`generation_image`");
    await queryRunner.query("DROP TABLE `iearn`.`gallery_image`");
    await queryRunner.query("DROP TABLE `iearn`.`contacts`");
    await queryRunner.query("DROP TABLE `iearn`.`admin`");
    await queryRunner.query("DROP TABLE `iearn`.`about`");
  }
}
