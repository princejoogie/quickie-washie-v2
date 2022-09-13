import { Router } from "express";
import validator from "../middlewares/validator";
import checkJwt from "../middlewares/check-jwt";
import {
  createVehicleSchema,
  deleteVehicleSchema,
  getVehicleByIdSchema,
  updateVehicleSchema,
} from "@qw/dto";
import createVehicleController from "../controllers/vehicle/create.controller";
import deleteVehicleController from "../controllers/vehicle/delete.controller";
import getAllVehiclesController from "../controllers/vehicle/get-all.controller";
import getVehicleByIdController from "../controllers/vehicle/get-by-id.controller";
import updateVehicleController from "../controllers/vehicle/update.controller";

const router = Router();

router.get("/", checkJwt, getAllVehiclesController);

router.post(
  "/",
  [checkJwt, validator(createVehicleSchema)],
  createVehicleController
);

router.get(
  "/:vehicleId",
  [checkJwt, validator(getVehicleByIdSchema)],
  getVehicleByIdController
);

router.put(
  "/:vehicleId",
  [checkJwt, validator(updateVehicleSchema)],
  updateVehicleController
);

router.delete(
  "/:vehicleId",
  [checkJwt, validator(deleteVehicleSchema)],
  deleteVehicleController
);

export default router;