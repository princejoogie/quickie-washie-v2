import { Router } from "express";
import checkJwt from "../middlewares/check-jwt";
import validator from "../middlewares/validator";

import { createBugReportSchema } from "@qw/dto";
import createBugReportController from "../controllers/report/create.controller";

export const reportRouter = Router();

reportRouter.post(
  "/",
  [checkJwt, validator(createBugReportSchema)],
  createBugReportController
);
