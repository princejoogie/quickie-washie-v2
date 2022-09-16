import { Router } from "express";
import validator from "../middlewares/validator";
import checkJwt from "../middlewares/check-jwt";
import { loginSchema, registerSchema, refreshTokenSchema } from "@qw/dto";
import loginController from "../controllers/auth/login.controller";
import registerController from "../controllers/auth/register.controller";
import profileController from "../controllers/auth/profile.controller";
import refreshTokenController from "../controllers/auth/refresh-token.controller";

export const authRouter = Router();

authRouter.get("/profile", checkJwt, profileController);
authRouter.post("/login", validator(loginSchema), loginController);
authRouter.post("/register", validator(registerSchema), registerController);
authRouter.post(
  "/refresh-token",
  validator(refreshTokenSchema),
  refreshTokenController
);
