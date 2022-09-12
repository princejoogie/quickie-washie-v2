import { Router } from "express";
import validator from "../middlewares/validator";
import checkJwt from "../middlewares/check-jwt";
import { createVehicleSchema, deleteVehicleSchema } from "@qw/dto";
import getAllVehiclesController from "../controllers/vehicle/get-all.controller";
import createVehicleController from "../controllers/vehicle/create.controller";
import deleteVehicleController from "../controllers/vehicle/delete.controller";

const router = Router();

router.get("/", checkJwt, getAllVehiclesController);

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
