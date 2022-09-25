import { Router } from "express";
import checkJwt from "../middlewares/check-jwt";

import { markNotificationSeenSchema } from "@qw/dto";
import getAllNotificationsController from "../controllers/notification/get-all.controller";
import markNotificationController from "../controllers/notification/mark-seen.controller";
import validator from "../middlewares/validator";

export const notificationRouter = Router();

notificationRouter.get("/", checkJwt, getAllNotificationsController);
notificationRouter.put(
  "/",
  [checkJwt, validator(markNotificationSeenSchema)],
  markNotificationController
);
