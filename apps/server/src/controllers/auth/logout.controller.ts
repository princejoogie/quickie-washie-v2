import type { RequestHandler } from "express";
import type { LogoutResponse } from "@qw/dto";
import { REFRESH_TOKEN_KEY } from "../../utils/jwt-helper";
import { AppError, SuccessType } from "../../utils/error";

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
