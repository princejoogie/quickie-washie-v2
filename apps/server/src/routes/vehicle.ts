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

export const vehicleRouter = Router();

vehicleRouter.get("/", checkJwt, getAllVehiclesController);

vehicleRouter.post(
  "/",
  [checkJwt, validator(createVehicleSchema)],
  createVehicleController
);

vehicleRouter.get(
  "/:vehicleId",
  [checkJwt, validator(getVehicleByIdSchema)],
  getVehicleByIdController
);

vehicleRouter.put(
  "/:vehicleId",
  [checkJwt, validator(updateVehicleSchema)],
  updateVehicleController
);

vehicleRouter.delete(
  "/:vehicleId",
  [checkJwt, validator(deleteVehicleSchema)],
  deleteVehicleController
);
