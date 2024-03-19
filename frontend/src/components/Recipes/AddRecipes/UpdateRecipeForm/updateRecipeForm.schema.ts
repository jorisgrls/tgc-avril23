import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Le titre de la recette est obligatoire" }),
  description: z
    .string()
    .min(1, { message: "La description de la recette est obligatoire" }),
  ingredients: z
    .array(
      z.object({
        id: z.string(),
        product: z.object({
          id: z.string(),
          quantity: z.string(),
        }),
      })
    )
    .min(1, { message: "Il faut au moins un ingrédient" }),

  steps: z
    .array(
      z.object({
        id: z.number(),
        text: z.string().min(1, { message: "L'étape ne peut pas être vide" }),
      })
    )
    .min(1, { message: "Il faut au moins une étape" }),
  image: z.string().url({ message: "L'url de l'image est invalide" }),
  difficulty: z.string(),
  preparationTime: z
    .string()
    .min(1, { message: "Le temps de préparation est obligatoire" }),
  isVegetarian: z.boolean().optional(),
});
