import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/error";

export const errorHandler = (
  err: AppError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.StatusCode).json(err.JSON);
  }

  const error = new AppError(
    "InternalServerErrorException",
    err.message ?? "Something went wrong."
  );

  return res.status(error.StatusCode).json(error.JSON);
};

export default errorHandler;
