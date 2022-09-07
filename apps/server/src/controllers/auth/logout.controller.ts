import type { RequestHandler } from "express";
import { REFRESH_TOKEN_KEY } from "../../utils/jwt-helper";
import { AppError, SuccessType } from "../../utils/error";

export interface LogoutResponse {
  success: boolean;
}

const logoutController: RequestHandler<any, LogoutResponse> = async (
  _,
  res,
  next
) => {
  try {
    res.clearCookie(REFRESH_TOKEN_KEY);
    return res.status(SuccessType.OK).json({ success: true });
  } catch (e) {
    const error = new AppError(
      "InternalServerErrorException",
      (e as any).message
    );
    return next(error);
  }
};

export default logoutController;
