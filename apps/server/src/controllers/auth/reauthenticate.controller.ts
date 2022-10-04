import type { RequestHandler } from "express";
import type { ReauthenticateBody, LoginResponse } from "@qw/dto";
import bcrypt from "bcryptjs";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";
import { createTokens } from "../../utils/jwt-helper";

const reauthenticateController: RequestHandler<
  any,
  LoginResponse,
  ReauthenticateBody
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    const { password } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!user) {
      const error = new AppError("NotFoundException", "User does not exist");
      return next(error);
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      const error = new AppError(
        "UnauthorizedException",
        "Invalid credentials"
      );
      return next(error);
    }

    const { accessToken, refreshToken } = createTokens({
      id: user.id,
      privilege: user.privilege,
      isVerified: user.isVerified,
    });

    return res.status(200).json({ accessToken, refreshToken });
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default reauthenticateController;
