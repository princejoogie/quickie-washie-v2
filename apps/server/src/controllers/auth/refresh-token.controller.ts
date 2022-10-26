import type { RequestHandler } from "express";
import type { RefreshTokenResponse, RefreshTokenBody } from "@qw/dto";
import { createTokens, verifyRefreshToken } from "../../utils/jwt-helper";

import { AppError, SuccessType } from "../../utils/error";
import prisma from "../../lib/prisma";

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

    const { id } = verifyRefreshToken(refreshToken);

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      const error = new AppError("NotFoundException", "User does not exist");
      return next(error);
    }

    const { accessToken, refreshToken: newRefreshToken } = createTokens({
      id,
      privilege: user.privilege,
      isVerified: user.isVerified,
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
