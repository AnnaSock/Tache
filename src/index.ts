import express from "express";
import { env } from "./config/env.js";
import tacheRoute from "./routes/TacheRoute.js";
import userRoute from "./routes/UtilisateurRoute.js";
import authentificate from "./middlewares/authentificate.js";
import permissionRoute from "./routes/PermissionRoute.js";
import coockieParser from "cookie-parser";
import cors from "cors"
const app = express();
const port = env.port;

app.use(express.json());
app.use(coockieParser());
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue" });
});
app.use(cors({
  origin: '*', 
  credentials: true,         
}));

app.use("/api/users", userRoute);
app.use("/api/taches", authentificate, tacheRoute);
app.use("/api/permissions", authentificate, permissionRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
