import { Taches, Etat } from "@prisma/client";
import { IRepository } from "./IRepository.js";
import { prisma } from "../config/prisma.js";

export class TacheRepository implements IRepository<Taches> {
  async findAll(): Promise<Taches[]> {
  return await prisma.taches.findMany({
    include: {
      utilisateur: true,
    },
  });
}


  async findById(id: number): Promise<Taches | null> {
    return await prisma.taches.findUnique({
      where: { id },
    });
  }

  async create(data: Omit<Taches, "id">): Promise<Taches> {
    return await prisma.taches.create({
      data: {
        titre: data.titre,
        description: data.description,
        utilisateur: {
          connect: { id: data.utilisateurId,
                     
           },
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
