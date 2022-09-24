import { Router } from "express";
import { appointmentRouter } from "./appointment";
import { authRouter } from "./auth";
import { analyticsRouter } from "./analytics";
import { documentRouter } from "./document";
import { vehicleRouter } from "./vehicle";
import { serviceRouter } from "./service";
import prisma from "../lib/prisma";

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

router.use("/appointment", appointmentRouter);
router.use("/auth", authRouter);
router.use("/analytics", analyticsRouter);
router.use("/document", documentRouter);
router.use("/vehicle", vehicleRouter);
router.use("/service", serviceRouter);

export default router;
