import type { RequestHandler } from "express";
import type { RefreshTokenResponse, RefreshTokenBody } from "@qw/dto";
import { createTokens, verifyRefreshToken } from "../../utils/jwt-helper";

import { SuccessType } from "../../utils/error";
import prisma from "../../lib/prisma";

const refreshTokenController: RequestHandler<
  any,
  RefreshTokenResponse,
  RefreshTokenBody
> = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res
        .status(SuccessType.OK)
        .json({ accessToken: "", refreshToken: "" });
    }

    const { id } = verifyRefreshToken(refreshToken);

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res
        .status(SuccessType.OK)
        .json({ accessToken: "", refreshToken: "" });
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
    return res
      .status(SuccessType.OK)
      .json({ accessToken: "", refreshToken: "" });
  }
};

export default refreshTokenController;
