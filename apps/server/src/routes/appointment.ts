import { Router } from "express";
import validator from "../middlewares/validator";
import checkJwt from "../middlewares/check-jwt";

import { createAppointmentSchema } from "@qw/dto";
import createAppointmentController from "../controllers/appointment/create.controller";
import getAllAppointmentsController from "../controllers/appointment/get-all.controller";

export const appointmentRouter = Router();

appointmentRouter.get("/", checkJwt, getAllAppointmentsController);

appointmentRouter.post(
  "/",
  [checkJwt, validator(createAppointmentSchema)],
  createAppointmentController
);
