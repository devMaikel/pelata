-- AlterTable
ALTER TABLE `grupos` MODIFY `descricao` VARCHAR(191) NOT NULL DEFAULT 'O camarada não colocou descrição';

-- AlterTable
ALTER TABLE `users` MODIFY `posicao` VARCHAR(191) NOT NULL DEFAULT 'Não definida',
    MODIFY `gols` INTEGER NOT NULL DEFAULT 0;
