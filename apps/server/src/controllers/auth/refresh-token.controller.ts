import type { RequestHandler } from "express";
import {
  createAndRefreshToken,
  REFRESH_TOKEN_KEY,
  verifyRefreshToken,
} from "../../utils/jwt-helper";

import { AppError, SuccessType } from "../../utils/error";

export interface RefreshTokenResponse {
  accessToken: string;
}

const refreshTokenController: RequestHandler = async (req, res, next) => {
  try {
    const refreshToken = req.cookies[REFRESH_TOKEN_KEY];

    if (!refreshToken) {
      const error = new AppError(
        "UnauthorizedException",
        "Refresh token is missing"
      );
      return next(error);
    }

    const { id, privilege } = verifyRefreshToken(refreshToken);
    const accessToken = createAndRefreshToken({ id, privilege }, res);

    return res.status(SuccessType.OK).json({ accessToken });
  } catch (e: any) {
    const error = new AppError("UnauthorizedException", e.message);
    return next(error);
  }
};

export default refreshTokenController;
