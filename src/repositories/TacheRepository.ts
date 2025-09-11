import { PrismaClient, Taches } from "@prisma/client";
import { IRepository } from "./IRepository.js";

const prisma = new PrismaClient();

export class TacheRepository implements IRepository<Taches> {
  async findAll(): Promise<Taches[]> {
    return await prisma.taches.findMany();
  }

  async findById(id: number): Promise<Taches | null> {
    return await prisma.taches.findUnique({
      where: { id },
    });
  }

async create(data: any): Promise<Taches> {
  return await prisma.taches.create({
    data: {
      titre: data.titre,
      description: data.description,
      statut: data.statut ?? "EN_COURS",
      utilisateur: {
        connect: { id: data.utilisateurId }, // ⚡ assure-toi que c’est toujours un nombre
      },
    },
  });
}


  async update(id: number, data: Partial<Omit<Taches, "id">>): Promise<Taches> {
    return await prisma.taches.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.taches.delete({
      where: { id },
    });
  }
}
