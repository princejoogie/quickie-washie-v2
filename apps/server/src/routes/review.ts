import { Router } from "express";
import checkJwt from "../middlewares/check-jwt";
import validator from "../middlewares/validator";

import { createReviewSchema } from "@qw/dto";
import createReviewController from "../controllers/review/create.controller";
import getAllReviewsController from "../controllers/review/get-all.controller";

export const reviewRouter = Router();

reviewRouter.get("/", checkJwt, getAllReviewsController);

reviewRouter.post(
  "/:appointmentId",
  [checkJwt, validator(createReviewSchema)],
  createReviewController
);
