import z from "zod"

export const TacheSchema=z.object({
      titre: z.string().min(1, "Tache requis"),
      description: z.string().min(1, "Description requis"),
      statut: z.enum(["EN_COURS", "TERMINER", "A_FAIRE"]).default("EN_COURS")}
)

