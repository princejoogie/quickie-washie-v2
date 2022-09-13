import { Router } from "express";
import validator from "../middlewares/validator";
import checkJwt from "../middlewares/check-jwt";
import { createServiceSchema, updateServiceSchema } from "@qw/dto";
import createServiceController from "../controllers/service/create.controller";
import getAllServicesController from "../controllers/service/get-all.controller";
import updateServiceController from "../controllers/service/update.controller";

const router = Router();

router.get("/", checkJwt, getAllServicesController);

router.post(
  "/",
  [checkJwt, validator(createServiceSchema)],
  createServiceController
);

router.put(
  "/:serviceId",
  [checkJwt, validator(updateServiceSchema)],
  updateServiceController
);

export default router;
