import { z } from "zod";

export const formSchema = z.object({
  product: z.string().min(1, { message: "Le produit est obligatoire" }),
  quantity: z.string().min(1, { message: "La quantité est obligatoire" }),
});
