import { Router } from "express";
import validator from "../middlewares/validator";
import checkJwt from "../middlewares/check-jwt";
import { createVehicleSchema } from "@qw/dto";
import createVehicleController from "../controllers/vehicle/create.controller";

const router = Router();

router.post(
  "/",
  [checkJwt, validator(createVehicleSchema)],
  createVehicleController
);

export default router;
