import { Router } from "express";
import validator from "../middlewares/validator";
import checkJwt from "../middlewares/check-jwt";

import { createAppointmentSchema } from "@qw/dto";
import createAppointmentController from "../controllers/appointment/create.controller";

export const appointmentRouter = Router();

appointmentRouter.get("/", (req, res) => {
  res.json({ message: `Hello World from ${req.originalUrl}` });
});

appointmentRouter.post(
  "/",
  [checkJwt, validator(createAppointmentSchema)],
  createAppointmentController
);
