import type { RequestHandler } from "express";
import { verifyAccessToken } from "../utils/jwt-helper";
import { AppError } from "../utils/error";

const checkJwt: RequestHandler = (req, _, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const error = new AppError("UnauthorizedException", "No token provided");
    return next(error);
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    const error = new AppError("UnauthorizedException", "No token provided");
    return next(error);
  }

  try {
    const { id, privilege } = verifyAccessToken(token);
    req.tokenPayload = { id, privilege };
    return next();
  } catch (e: any) {
    const error = new AppError("UnauthorizedException", e.message);
    return next(error);
  }
};

export default checkJwt;
