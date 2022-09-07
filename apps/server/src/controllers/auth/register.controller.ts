import type { RequestHandler } from "express";
import type { RegisterBody, RegisterResponse } from "@qw/dto";
import bcrypt from "bcryptjs";

import prisma from "../../lib/prisma";
import { AppError } from "../../utils/error";
import { createAndRefreshToken, HASH_SALT } from "../../utils/jwt-helper";

const registerController: RequestHandler<
  any,
  RegisterResponse,
  RegisterBody
> = async (req, res, next) => {
  try {
    const { email, password, licenseUrl, name } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      const error = new AppError("BadRequestException", "User already exists");
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, HASH_SALT);

    const newUser = await prisma.user.create({
      data: {
        email,
        licenseUrl,
        name,
        password: hashedPassword,
      },
    });
    console.log("created newUser");

    const accessToken = createAndRefreshToken(
      { id: newUser.id, privilege: newUser.privilege },
      res
    );
    console.log("created accessToken");

    return res.status(200).json({ accessToken, user: newUser });
  } catch (e) {
    const error = new AppError(
      "InternalServerErrorException",
      (e as any).message
    );
    return next(error);
  }
};

export default registerController;
