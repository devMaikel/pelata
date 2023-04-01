/*
  Warnings:

  - You are about to drop the column `gols` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `posicao` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `_GrupoToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PeladaToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TimeToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `partidas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `times` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[admin_id]` on the table `grupos` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `_GrupoToUser` DROP FOREIGN KEY `_GrupoToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_GrupoToUser` DROP FOREIGN KEY `_GrupoToUser_B_fkey`;

-- DropForeignKey
ALTER TABLE `_PeladaToUser` DROP FOREIGN KEY `_PeladaToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_PeladaToUser` DROP FOREIGN KEY `_PeladaToUser_B_fkey`;

-- DropForeignKey
ALTER TABLE `_TimeToUser` DROP FOREIGN KEY `_TimeToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_TimeToUser` DROP FOREIGN KEY `_TimeToUser_B_fkey`;

-- DropForeignKey
ALTER TABLE `partidas` DROP FOREIGN KEY `partidas_pelada_id_fkey`;

-- DropForeignKey
ALTER TABLE `partidas` DROP FOREIGN KEY `partidas_vencedor_id_fkey`;

-- DropForeignKey
ALTER TABLE `times` DROP FOREIGN KEY `times_pelada_id_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `gols`,
    DROP COLUMN `posicao`;

-- DropTable
DROP TABLE `_GrupoToUser`;

-- DropTable
DROP TABLE `_PeladaToUser`;

-- DropTable
DROP TABLE `_TimeToUser`;

-- DropTable
DROP TABLE `partidas`;

-- DropTable
DROP TABLE `times`;

-- CreateTable
CREATE TABLE `jogadores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `nome` VARCHAR(191) NOT NULL,
    `posicao` VARCHAR(191) NOT NULL DEFAULT 'Não definida',
    `gols` INTEGER NOT NULL DEFAULT 0,
    `vitorias` INTEGER NOT NULL DEFAULT 0,
    `derrotas` INTEGER NOT NULL DEFAULT 0,
    `empates` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `jogadores_id_key`(`id`),
    UNIQUE INDEX `jogadores_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_JogadorToPelada` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_JogadorToPelada_AB_unique`(`A`, `B`),
    INDEX `_JogadorToPelada_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GrupoToJogador` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GrupoToJogador_AB_unique`(`A`, `B`),
    INDEX `_GrupoToJogador_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `grupos_admin_id_key` ON `grupos`(`admin_id`);

-- AddForeignKey
ALTER TABLE `jogadores` ADD CONSTRAINT `jogadores_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grupos` ADD CONSTRAINT `grupos_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_JogadorToPelada` ADD CONSTRAINT `_JogadorToPelada_A_fkey` FOREIGN KEY (`A`) REFERENCES `jogadores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_JogadorToPelada` ADD CONSTRAINT `_JogadorToPelada_B_fkey` FOREIGN KEY (`B`) REFERENCES `peladas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GrupoToJogador` ADD CONSTRAINT `_GrupoToJogador_A_fkey` FOREIGN KEY (`A`) REFERENCES `grupos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GrupoToJogador` ADD CONSTRAINT `_GrupoToJogador_B_fkey` FOREIGN KEY (`B`) REFERENCES `jogadores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
