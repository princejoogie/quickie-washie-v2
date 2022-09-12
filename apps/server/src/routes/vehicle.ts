import { Router } from "express";
import validator from "../middlewares/validator";
import checkJwt from "../middlewares/check-jwt";
import { createVehicleSchema, deleteVehicleSchema } from "@qw/dto";
import createVehicleController from "../controllers/vehicle/create.controller";
import deleteVehicleController from "../controllers/vehicle/delete.controller";

const router = Router();

router.post(
  "/",
  [checkJwt, validator(createVehicleSchema)],
  createVehicleController
);

router.delete(
  "/",
  [checkJwt, validator(deleteVehicleSchema)],
  deleteVehicleController
);

export default router;
