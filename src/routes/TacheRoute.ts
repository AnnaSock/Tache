import { Router } from "express";
import { TacheController } from "../controllers/TacheController.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";

const tacheRoute = Router();
const tacheController = new TacheController();

tacheRoute.post("/", TacheController.create.bind(tacheController));
tacheRoute.get("/", TacheController.findAll.bind(tacheController));
tacheRoute.get("/:id", TacheController.findById.bind(tacheController));
tacheRoute.put("/:id", AuthMiddleware.autorizate ,TacheController.update.bind(tacheController));
tacheRoute.delete("/:id",AuthMiddleware.autorizate, TacheController.delete.bind(tacheController));
// tacheRoute.post("/:id/permission");

export default tacheRoute;
