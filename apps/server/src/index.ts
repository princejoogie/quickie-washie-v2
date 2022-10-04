import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import routes from "./routes/index";
import errorHandler from "./middlewares/error-handler";
import { verifyVerifyAccountToken } from "./utils/jwt-helper";
import { JsonWebTokenError } from "jsonwebtoken";

const PORT = process.env["PORT"] ?? 4000;

const main = async () => {
  const app = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.static("public"));
  app.use(morgan("combined"));

  app.use("/api", routes);
  app.use("/verify-account", (req, res) => {
    try {
      const { token } = req.query;

      if (!token || typeof token !== "string") {
        throw new Error("Token not found");
      }

      try {
        const user = verifyVerifyAccountToken(token);
        // TODO: mark user as verified
        console.log({ user });
        return res.send("Account verified. You can now close this tab.");
      } catch (err) {
        if (err instanceof JsonWebTokenError) {
          if (err.message.includes("expired")) {
            return res.send("Token expired. Please request a new one.");
          }

          return res.send("Invalid token. Please request a new one.");
        }
        throw err;
      }
    } catch (error) {
      console.log(error);
      return res.send("Could not verify account.");
    }
  });
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
};

main().catch(console.error);
