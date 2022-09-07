import "dotenv/config";
import { PrismaClient } from "@qw/db";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
});

const PORT = process.env["PORT"] ?? 4000;

const main = async () => {
  const app = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.static("public"));
  app.use(morgan("combined"));

  app.get("/api/test", (_, res) => {
    res.json({ message: "Hello World from /api/test" });
  });

  app.get("/api/prisma", async (_, res) => {
    try {
      await prisma.$connect();
      res.json({ message: "database connected" });
    } catch {
      res.json({ message: "failed to connect to database" });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
};

main().catch(console.error);
