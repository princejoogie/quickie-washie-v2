import type { RequestHandler } from "express";
import { AppError } from "../../utils/error";
import type { LoginResponse, LoginBody } from "../../dtos/auth.dto";

const loginController: RequestHandler<any, LoginResponse, LoginBody> = async (
  _,
  res,
  next
) => {
  try {
    return res.status(200).json({ accessToken: "access_token_here" });
  } catch (e) {
    const error = new AppError(
      "InternalServerErrorException",
      (e as any).message
    );
    return next(error);
  }
};

export default loginController;
