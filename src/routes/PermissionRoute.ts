import { Router } from "express";
import { PermissionController } from "../controllers/PermissionController.js";




const permissionRoute = Router();


permissionRoute.post("/", PermissionController.create);


export default permissionRoute;