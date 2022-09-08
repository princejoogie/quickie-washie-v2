import type { RequestHandler } from "express";
import type { RefreshTokenResponse, RefreshTokenBody } from "@qw/dto";
import { createTokens, verifyRefreshToken } from "../../utils/jwt-helper";

import { AppError, SuccessType } from "../../utils/error";

const refreshTokenController: RequestHandler<
  any,
  RefreshTokenResponse,
  RefreshTokenBody
> = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      const error = new AppError(
        "UnauthorizedException",
        "Refresh token is missing"
      );
      return next(error);
    }

    const { id, privilege } = verifyRefreshToken(refreshToken);
    const { accessToken, refreshToken: newRefreshToken } = createTokens({
      id,
      privilege,
    });

    return res
      .status(SuccessType.OK)
      .json({ accessToken, refreshToken: newRefreshToken });
  } catch (e: any) {
    const error = new AppError("UnauthorizedException", e.message);
    return next(error);
  }
};

export default refreshTokenController;
