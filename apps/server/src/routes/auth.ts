import { Router } from "express";
import validator from "../middlewares/validator";
import { loginSchema } from "../dtos/auth.dto";
import loginController from "../controllers/auth/login.controller";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: `Hello World from ${req.originalUrl}` });
});

router.post("/login", validator(loginSchema), loginController)

export default router;
