/*
  Warnings:

  - Added the required column `pelada_id` to the `times` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `times` ADD COLUMN `pelada_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `times` ADD CONSTRAINT `times_pelada_id_fkey` FOREIGN KEY (`pelada_id`) REFERENCES `peladas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
