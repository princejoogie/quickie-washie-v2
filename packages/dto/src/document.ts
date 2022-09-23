import { z } from "zod";
import type { ValidatorSchema } from "./common";

// CREATE

export const createDocumentBodySchema = z.object({
  documents: z.array(
    z.object({
      downloadUrl: z.string(),
      mimeType: z.string(),
      name: z.string(),
    })
  ),
  appointmentId: z.string().cuid(),
});

export type CreateDocumentBody = z.infer<typeof createDocumentBodySchema>;

export const createDocumentSchema: ValidatorSchema = {
  body: createDocumentBodySchema,
};
