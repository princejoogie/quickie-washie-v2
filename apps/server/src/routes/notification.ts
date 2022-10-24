import { Router } from "express";
import checkJwt from "../middlewares/check-jwt";

import {
  markNotificationSeenSchema,
  registerTokenSchema,
  unregisterTokenSchema,
} from "@qw/dto";
import registerPushNotificationTokenController from "../controllers/notification/register-token.controller";
import unregisterPushNotificationTokenController from "../controllers/notification/unregister-token.controller";
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

notificationRouter.post(
  "/token/register",
  [checkJwt, validator(registerTokenSchema)],
  registerPushNotificationTokenController
);

notificationRouter.post(
  "/token/unregister",
  [checkJwt, validator(unregisterTokenSchema)],
  unregisterPushNotificationTokenController
);
