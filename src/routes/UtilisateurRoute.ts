import { Router } from "express";
import { UtilisateurController } from "../controllers/UtilisateurController.js";

const userRoute = Router();
const utilisateurController = new UtilisateurController();

userRoute.post("/", UtilisateurController.create.bind(utilisateurController));
userRoute.post("/login", UtilisateurController.login.bind(utilisateurController));
userRoute.get("/", UtilisateurController.findAll.bind(utilisateurController));
userRoute.get("/:id", UtilisateurController.findById.bind(utilisateurController));
userRoute.put("/:id", UtilisateurController.update.bind(utilisateurController));
userRoute.delete("/:id", UtilisateurController.delete.bind(utilisateurController));
export default userRoute;


