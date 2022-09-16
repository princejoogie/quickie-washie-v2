import type { RequestHandler } from "express";
import type { LoginResponse, LoginBody } from "@qw/dto";
import bcrypt from "bcryptjs";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";
import { createTokens } from "../../utils/jwt-helper";

const loginController: RequestHandler<any, LoginResponse, LoginBody> = async (
  req,
  res,
  next
) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
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
    });

    return res.status(200).json({ accessToken, refreshToken });
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default loginController;
