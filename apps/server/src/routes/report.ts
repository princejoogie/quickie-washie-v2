import { Router } from "express";
import checkJwt from "../middlewares/check-jwt";
import validator from "../middlewares/validator";

import { createBugReportSchema } from "@qw/dto";
import createBugReportController from "../controllers/report/create.controller";
import getAllBugReportsController from "../controllers/report/get-all.controller";

export const reportRouter = Router();

reportRouter.get("/", checkJwt, getAllBugReportsController);

reportRouter.post(
  "/",
  [checkJwt, validator(createBugReportSchema)],
  createBugReportController
);
