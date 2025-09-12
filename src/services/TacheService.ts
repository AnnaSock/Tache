import { Taches } from "@prisma/client";
import { TacheRepository } from "../repositories/TacheRepository.js";

export class TacheService {
  private tacheRepo: TacheRepository = new TacheRepository();

  async create(data: Omit<Taches, "id"> & { utilisateurId: number }): Promise<Taches> {
    if (!data.utilisateurId) {
      throw new Error("UtilisateurId manquant pour la création de la tâche");
    }

    return await this.tacheRepo.create({
      titre: data.titre,
      description: data.description,
      statut: data.statut ?? "EN_COURS",
      utilisateurId: data.utilisateurId,
    });
  }

  async findAll(): Promise<Taches[]> {
    return this.tacheRepo.findAll();
  }

  async findById(id: number): Promise<Taches | null> {
    return this.tacheRepo.findById(id);
  }

  async update(id: number, data: Partial<Omit<Taches, "id">>): Promise<Taches> {
    return this.tacheRepo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.tacheRepo.delete(id);
  }
}
