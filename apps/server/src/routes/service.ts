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

const router = Router();

router.get("/", checkJwt, getAllServicesController);

router.post(
  "/",
  [checkJwt, validator(createServiceSchema)],
  createServiceController
);

router.get(
  "/:serviceId",
  [checkJwt, validator(getServiceByIdSchema)],
  getServiceByIdController
);

router.put(
  "/:serviceId",
  [checkJwt, validator(updateServiceSchema)],
  updateServiceController
);

router.delete(
  "/:serviceId",
  [checkJwt, validator(deleteServiceSchema)],
  deleteServiceController
);

export default router;
