import type { RequestHandler } from "express";
import type { ChangePasswordBody, LoginResponse } from "@qw/dto";
import bcrypt from "bcryptjs";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";
import { createTokens, HASH_SALT } from "../../utils/jwt-helper";

const changePasswordController: RequestHandler<
  any,
  LoginResponse,
  ChangePasswordBody
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    const { password, newPassword } = req.body;

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
        "Invalid password provided"
      );
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(newPassword, HASH_SALT);

    await prisma.user.update({
      where: { id: payload.id },
      data: { password: hashedPassword },
    });

    const { accessToken, refreshToken } = createTokens({
      id: user.id,
      privilege: user.privilege,
    });

    return res.status(200).json({ accessToken, refreshToken });
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default changePasswordController;
