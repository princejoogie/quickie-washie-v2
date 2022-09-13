import { Router } from "express";
import validator from "../middlewares/validator";
import checkJwt from "../middlewares/check-jwt";
import { createServiceSchema } from "@qw/dto";
import createServiceController from "../controllers/service/create.controller";

const router = Router();

router.post(
  "/",
  [checkJwt, validator(createServiceSchema)],
  createServiceController
);

export default router;
