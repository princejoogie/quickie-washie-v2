import { Router } from "express";
import validator from "../middlewares/validator";
import checkJwt from "../middlewares/check-jwt";
import { loginSchema, registerSchema, refreshTokenSchema } from "@qw/dto";
import loginController from "../controllers/auth/login.controller";
import registerController from "../controllers/auth/register.controller";
import profileController from "../controllers/auth/profile.controller";
import refreshTokenController from "../controllers/auth/refresh-token.controller";

const router = Router();

router.get("/profile", checkJwt, profileController);
router.post("/login", validator(loginSchema), loginController);
router.post("/register", validator(registerSchema), registerController);
router.post(
  "/refresh-token",
  validator(refreshTokenSchema),
  refreshTokenController
);

export default router;
