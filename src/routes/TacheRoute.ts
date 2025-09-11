import { Router } from "express";
import { TacheController } from "../controllers/TacheController.js";

const tacheRoute = Router();
const tacheController = new TacheController();

tacheRoute.post("/", TacheController.create.bind(tacheController));
tacheRoute.get("/", TacheController.findAll.bind(tacheController));
tacheRoute.get("/:id", TacheController.findById.bind(tacheController));
tacheRoute.put("/:id", TacheController.update.bind(tacheController));
tacheRoute.delete("/:id", TacheController.delete.bind(tacheController));

export default tacheRoute;
