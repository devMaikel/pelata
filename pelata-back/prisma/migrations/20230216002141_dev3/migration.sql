-- AlterTable
ALTER TABLE `peladas` MODIFY `data` DATETIME(3) NULL,
    MODIFY `cep` VARCHAR(191) NULL,
    MODIFY `bairro` VARCHAR(191) NULL,
    MODIFY `cidade` VARCHAR(191) NULL,
    MODIFY `estado` VARCHAR(191) NULL,
    MODIFY `rua` VARCHAR(191) NULL;
