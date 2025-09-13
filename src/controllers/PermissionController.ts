import { Response } from "express";
import { AuthRequest } from "../middlewares/authentificate";
import { PermissionService } from "../services/PermissionService.js";
import { Permission, TypePermission } from "@prisma/client";
import { typeCreatePerm } from "../types/typePermission";

export class PermissionController {
private static permissionService = new PermissionService();

  static async create(req: AuthRequest, res: Response) {
    try {
      const connectId = req.user?.id;
      const { utilisateurId, tacheId, typePermission } = req.body;

      if (!connectId) {
        return res.status(401).json({ message: "Non authentifié" });
      }

      const permission = await PermissionController.permissionService.create({
          connectId,
          utilisateurId,
          tacheId,
          typePermission: typePermission as TypePermission
     });

      res.status(201).json({ status: "success", data: permission });
    } catch (error: any) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }




  
}
