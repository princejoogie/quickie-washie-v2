import { Router } from "express";
/* import validator from "../middlewares/validator"; */
import checkJwt from "../middlewares/check-jwt";
import getSalesController from "../controllers/analytics/get-sales.controller";

export const analyticsRouter = Router();

analyticsRouter.get("/sales", checkJwt, getSalesController);
