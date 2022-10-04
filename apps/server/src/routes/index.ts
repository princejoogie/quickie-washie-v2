import { Router } from "express";
import prisma from "../lib/prisma";
import { analyticsRouter } from "./analytics";
import { appointmentRouter } from "./appointment";
import { authRouter } from "./auth";
import { documentRouter } from "./document";
import { notificationRouter } from "./notification";
import { reviewRouter } from "./review";
import { serviceRouter } from "./service";
import { vehicleRouter } from "./vehicle";

const router = Router();

router.get("/", async (_, res) => {
  try {
    await prisma.$connect();
    res.json({ message: "database connected" });
  } catch (e) {
    console.log(e);
    res.json({ message: "failed to connect to database", error: e });
  }
});

router.use("/analytics", analyticsRouter);
router.use("/appointment", appointmentRouter);
router.use("/auth", authRouter);
router.use("/document", documentRouter);
router.use("/notification", notificationRouter);
router.use("/review", reviewRouter);
router.use("/service", serviceRouter);
router.use("/vehicle", vehicleRouter);

export default router;
