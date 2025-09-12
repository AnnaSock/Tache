import { UtilisateurService } from "../services/UtilisateurService.js";
import { Request, Response } from "express";
import { utilisateurSchema, loginSchema } from "../validators/Utilisateur.js";

export class UtilisateurController {
  private static userSer: UtilisateurService = new UtilisateurService();

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

  static async create(req: Request, res: Response) {
      const valide= utilisateurSchema.safeParse(req.body)
      if (!valide.success) return res.status(400).json({message: "Erreur Creation",error:valide.error.format()})
      const userValid= await  UtilisateurController.userSer.create(valide.data);
      res.status(200).json(userValid)
  }

  static findAll(req: Request, res: Response) {
    return UtilisateurController.handleRequest(res, () => {
      return UtilisateurController.userSer.findAll();
    });
  }

  static findById(req: Request, res: Response) {
    return UtilisateurController.handleRequest(res, () => {
      const id = Number(req.params.id);
      return UtilisateurController.userSer.findById(id);
    });
  }

  static update(req: Request, res: Response) {
    return UtilisateurController.handleRequest(res, () => {
      const id = Number(req.params.id);
      const data = req.body;
      return UtilisateurController.userSer.update(id, data);
    });
  }

  static delete(req: Request, res: Response) {
    return UtilisateurController.handleRequest(res, () => {
      const id = Number(req.params.id);
      return UtilisateurController.userSer.delete(id);
    });
  }

  static async login(req: Request, res:Response){
    try {
        const valide=  loginSchema.safeParse(req.body);
        const user= req.body;
        if (!valide.success) return res.status(400).json({message: "Erreur Connexion", error: valide.error.format()});
        const userValid= await UtilisateurController.userSer.login(user) 
        res.status(200).json({message: "Connexion Reussi", userValid});
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
  }

}
