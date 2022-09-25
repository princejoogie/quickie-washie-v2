import { Router } from "express";
import checkJwt from "../middlewares/check-jwt";

import getAllNotificationsController from "../controllers/notification/get-all.controller";

export const notificationRouter = Router();

notificationRouter.get("/", checkJwt, getAllNotificationsController);
