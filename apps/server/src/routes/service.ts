import { Router } from "express";
import validator from "../middlewares/validator";
import checkJwt from "../middlewares/check-jwt";
import {
  createServiceSchema,
  deleteServiceSchema,
  getServiceByIdSchema,
  updateServiceSchema,
} from "@qw/dto";
import createServiceController from "../controllers/service/create.controller";
import deleteServiceController from "../controllers/service/delete.controller";
import getAllServicesController from "../controllers/service/get-all.controller";
import getServiceByIdController from "../controllers/service/get-by-id.controller";
import updateServiceController from "../controllers/service/update.controller";

export const serviceRouter = Router();

serviceRouter.get("/", checkJwt, getAllServicesController);

serviceRouter.post(
  "/",
  [checkJwt, validator(createServiceSchema)],
  createServiceController
);

serviceRouter.get(
  "/:serviceId",
  [checkJwt, validator(getServiceByIdSchema)],
  getServiceByIdController
);

serviceRouter.put(
  "/:serviceId",
  [checkJwt, validator(updateServiceSchema)],
  updateServiceController
);

serviceRouter.delete(
  "/:serviceId",
  [checkJwt, validator(deleteServiceSchema)],
  deleteServiceController
);
