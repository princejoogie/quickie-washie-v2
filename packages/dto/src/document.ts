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
  userId: z.string().cuid(),
});

export type CreateDocumentBody = z.infer<typeof createDocumentBodySchema>;

export const createDocumentSchema: ValidatorSchema = {
  body: createDocumentBodySchema,
};

// DELETE

export const deleteDocumentParamsSchema = z.object({
  documentId: z.string().cuid(),
});

export type DeleteDocumentParams = z.infer<typeof deleteDocumentParamsSchema>;

export type DeleteDocumentResponse = boolean;

export const deleteDocumentSchema: ValidatorSchema = {
  params: deleteDocumentParamsSchema,
};
