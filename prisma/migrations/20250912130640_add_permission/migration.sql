-- CreateTable
CREATE TABLE `_tachePermission` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_tachePermission_AB_unique`(`A`, `B`),
    INDEX `_tachePermission_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_tachePermission` ADD CONSTRAINT `_tachePermission_A_fkey` FOREIGN KEY (`A`) REFERENCES `Taches`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_tachePermission` ADD CONSTRAINT `_tachePermission_B_fkey` FOREIGN KEY (`B`) REFERENCES `Utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
