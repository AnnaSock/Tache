import zod from "zod";

export const utilisateurSchema = zod.object({
  nom: zod.string().min(1, "le nom est requis"),
  prenom: zod.string().min(1, "le prenom est requis"),
  email: zod.string().email("Ceci n'est pas un email valide"),
  adresse: zod.string().min(0, "l'adresse est requis"),
  login: zod.string().min(1, "le login est requis"),
  photo: zod.string().min(0, "la photo est requis"),
  password: zod.string().min(1, "le password est requis"),
  telephone: zod.string().min(1, "le telephone est requis"),
  genre: zod.string().min(1, "le genre est requis"),
});

export const loginSchema = zod.object({
  email: zod.string().email("Ceci n'est pas un email valide"),
  password: zod.string().min(1, "le password est requis"),
});
