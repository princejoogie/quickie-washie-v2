import { Router } from "express";
import validator from "../middlewares/validator";
import checkJwt from "../middlewares/check-jwt";

import { createDocumentSchema, deleteDocumentSchema } from "@qw/dto";
import createDocumentController from "../controllers/document/create.controller";
import deleteDocumentController from "../controllers/document/delete.controller";

export const documentRouter = Router();

documentRouter.post(
  "/",
  [checkJwt, validator(createDocumentSchema)],
  createDocumentController
);

documentRouter.delete(
  "/:documentId",
  [checkJwt, validator(deleteDocumentSchema)],
  deleteDocumentController
);
