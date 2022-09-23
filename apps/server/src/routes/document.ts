import { Router } from "express";
import validator from "../middlewares/validator";
import checkJwt from "../middlewares/check-jwt";

import { createDocumentSchema } from "@qw/dto";
import createDocumentController from "../controllers/document/create.controller";

export const documentRouter = Router();

documentRouter.post(
  "/",
  [checkJwt, validator(createDocumentSchema)],
  createDocumentController
);
