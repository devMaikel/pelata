/*
  Warnings:

  - Added the required column `bairro` to the `peladas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `peladas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `peladas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rua` to the `peladas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `peladas` ADD COLUMN `bairro` VARCHAR(191) NOT NULL,
    ADD COLUMN `cidade` VARCHAR(191) NOT NULL,
    ADD COLUMN `estado` VARCHAR(191) NOT NULL,
    ADD COLUMN `rua` VARCHAR(191) NOT NULL;
