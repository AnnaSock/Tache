-- CreateTable
CREATE TABLE `Taches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `statut` ENUM('EN_COURS', 'TERMINER', 'A_FAIRE') NOT NULL DEFAULT 'EN_COURS',
    `utilisateurId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Utilisateur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NULL,
    `photo` VARCHAR(191) NULL,
    `login` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NULL,
    `genre` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Utilisateur_email_key`(`email`),
    UNIQUE INDEX `Utilisateur_login_key`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Taches` ADD CONSTRAINT `Taches_utilisateurId_fkey` FOREIGN KEY (`utilisateurId`) REFERENCES `Utilisateur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
