import { Router } from "express";
import checkJwt from "../middlewares/check-jwt";
import validator from "../middlewares/validator";

import {
  createAppointmentSchema,
  createMessageSchema,
  createReviewSchema,
  deleteAppointmentSchema,
  getAllMessagesSchema,
  getAppointmentByIdSchema,
  updateAppointmentSchema,
} from "@qw/dto";
import createAppointmentController from "../controllers/appointment/create.controller";
import deleteAppointmentController from "../controllers/appointment/delete.controller";
import getAllAppointmentsController from "../controllers/appointment/get-all.controller";
import getAppointmentByIdController from "../controllers/appointment/get-by-id.controller";
import createAppointmentMessageController from "../controllers/appointment/messages/create.controller";
import getAppointmentMessagesController from "../controllers/appointment/messages/get-all.controller";
import updateAppointmentController from "../controllers/appointment/update.controller";
import createReviewController from "../controllers/review/create.controller";

export const appointmentRouter = Router();

appointmentRouter.get("/", checkJwt, getAllAppointmentsController);

appointmentRouter.post(
  "/",
  [checkJwt, validator(createAppointmentSchema)],
  createAppointmentController
);

appointmentRouter.get(
  "/:appointmentId",
  [checkJwt, validator(getAppointmentByIdSchema)],
  getAppointmentByIdController
);

appointmentRouter.put(
  "/:appointmentId",
  [checkJwt, validator(updateAppointmentSchema)],
  updateAppointmentController
);

appointmentRouter.delete(
  "/:appointmentId",
  [checkJwt, validator(deleteAppointmentSchema)],
  deleteAppointmentController
);

// Messages

appointmentRouter.get(
  "/:appointmentId/message",
  [checkJwt, validator(getAllMessagesSchema)],
  getAppointmentMessagesController
);

appointmentRouter.post(
  "/:appointmentId/message",
  [checkJwt, validator(createMessageSchema)],
  createAppointmentMessageController
);

appointmentRouter.post(
  "/:appointmentId/review",
  [checkJwt, validator(createReviewSchema)],
  createReviewController
);
