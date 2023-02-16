/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `grupos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `partidas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `peladas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `times` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `grupos_id_key` ON `grupos`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `partidas_id_key` ON `partidas`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `peladas_id_key` ON `peladas`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `times_id_key` ON `times`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `users_id_key` ON `users`(`id`);
