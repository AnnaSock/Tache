import { Permission, TypePermission } from "@prisma/client";
import { PermissionRepository } from "../repositories/PermissionRepository.js";
import { typeCreatePerm } from "../types/typePermission.js";
import { TacheRepository } from "../repositories/TacheRepository.js";
import { UtilisateurRepository } from "../repositories/UtilisateurRepository.js";

export class PermissionService {
  private permissionRepository: PermissionRepository =
    new PermissionRepository();

  private tacheRepo: TacheRepository = new TacheRepository();
  private utilisateurRepo: UtilisateurRepository = new UtilisateurRepository();

  async findPermission(data: Omit<Permission, "id">) {
    return await this.permissionRepository.findByProp(data);
  }

  async create(createProp: typeCreatePerm): Promise<Permission> {
    const tache = await this.tacheRepo.findById(createProp.tacheId);
    if (!tache) throw new Error("la tache demandée n'existe pas");

    if (tache.utilisateurId !== createProp.connectId)
      throw new Error("Vous n'etes pas proprietaire de cette tache");

    const userCible = await this.utilisateurRepo.findById(
      createProp.utilisateurId
    );
    if (!userCible)
      throw new Error("L'utilisateur qui detient la permission n'existe pas");

    if (!Object.values(TypePermission).includes(createProp.typePermission))
      throw new Error("Type de permission invalide");

    return await this.permissionRepository.create(createProp);
  }
}
