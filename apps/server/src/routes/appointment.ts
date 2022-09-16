import { Router } from "express";

export const appointmentRouter = Router();

appointmentRouter.get("/", (req, res) => {
  res.json({ message: `Hello World from ${req.originalUrl}` });
});
