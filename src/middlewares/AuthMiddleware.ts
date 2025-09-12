import { NextFunction, Response } from "express";
import { TacheService } from "../services/TacheService.js";
import { AuthRequest } from "./authentificate.js";
import { Utilisateur } from "@prisma/client";

export class AuthMiddleware {
  private static tacheService: TacheService = new TacheService();

  static async  autorizate(req: AuthRequest, res: Response, next: NextFunction) {
    const tacheId = Number(req.params.id);
    const tache = await AuthMiddleware.tacheService.findById(tacheId);
    const user = req.user;
    if (tache?.utilisateurId !== user?.id)
      return res.status(401).json({ message: "acces refuser" });

    next();
  }
}
