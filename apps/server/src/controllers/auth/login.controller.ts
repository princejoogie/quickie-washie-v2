import type { RequestHandler } from "express";
import bcrypt from "bcryptjs";

import prisma from "../../lib/prisma";
import { AppError } from "../../utils/error";
import { createAndRefreshToken } from "../../utils/jwt-helper";
import type { LoginResponse, LoginBody } from "../../dtos/auth.dto";

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

    const accessToken = createAndRefreshToken(
      { id: user.id, privilege: user.privilege },
      res
    );

    return res.status(200).json({ accessToken });
  } catch (e) {
    const error = new AppError(
      "InternalServerErrorException",
      (e as any).message
    );
    return next(error);
  }
};

export default loginController;
