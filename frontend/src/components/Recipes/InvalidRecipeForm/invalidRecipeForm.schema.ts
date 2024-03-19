import { z } from "zod";

export const formSchema = z.object({
  reason: z.string().min(1, { message: "La raison du refus est obligatoire" }),
});
