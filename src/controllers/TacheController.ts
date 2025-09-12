import { TacheService } from "../services/TacheService.js";
import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/authentificate.js";
import { TacheSchema } from "../validators/taches.js";
export class TacheController {
  private static tacheSer: TacheService = new TacheService();

  private static async handleRequest(
    res: Response,
    callback: () => Promise<any>,
    successStatus = 200
  ) {
    try {
      const data = await callback();
      res.status(successStatus).json({ status: "success", data });
    } catch (mnError: any) {
      const statusCode =
        mnError.message?.includes("introuvable") ||
        mnError.message?.includes("ID") ||
        mnError.message?.includes("Accès interdit")
          ? 403
          : 400;

      res
        .status(statusCode)
        .json({ status: "error", message: mnError.message });
    }
  }
  static async create(req: AuthRequest, res: Response) {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé" });
      }

      const tacheValide = TacheSchema.safeParse(req.body);
      if (!tacheValide.success) {
        return res.status(400).json({
          message: "Erreur Creation",
          error: tacheValide.error.format,
        });
      }

      const data = {
        ...tacheValide.data,
        utilisateurId: user.id,
      };

      const tache = await TacheController.tacheSer.create(data);
      res.status(201).json({ status: "success", data: tache });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  static findAll(req: Request, res: Response) {
    return TacheController.handleRequest(res, () => {
      return TacheController.tacheSer.findAll();
    });
  }

  static findById(req: Request, res: Response) {
    return TacheController.handleRequest(res, () => {
      const id = Number(req.params.id);
      return TacheController.tacheSer.findById(id);
    });
  }

  static update(req: Request, res: Response) {
    return TacheController.handleRequest(res, () => {
      const id = Number(req.params.id);
      const data = req.body;
      return TacheController.tacheSer.update(id, data);
    });
  }

  static delete(req: Request, res: Response) {
    return TacheController.handleRequest(res, () => {
      const id = Number(req.params.id);
      return TacheController.tacheSer.delete(id);
    });
  }
}
