import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import routes from "./routes/index";

const PORT = process.env["PORT"] ?? 4000;

const main = async () => {
  const app = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.static("public"));
  app.use(morgan("combined"));
  app.use("/api", routes);

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
};

main().catch(console.error);
