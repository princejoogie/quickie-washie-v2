import { Router } from "express";
import validator from "../middlewares/validator";
import { loginSchema, registerSchema } from "../dtos/auth.dto";
import loginController from "../controllers/auth/login.controller";
import registerController from "../controllers/auth/register.controller";
import logoutController from "../controllers/auth/logout.controller";

const router = Router();

router.post("/login", validator(loginSchema), loginController);
router.post("/register", validator(registerSchema), registerController);
router.post("/logout", logoutController);

export default router;
