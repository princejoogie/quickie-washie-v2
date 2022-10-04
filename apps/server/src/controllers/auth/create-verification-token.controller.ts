import type { RequestHandler } from "express";
import type { CreateVerificationTokenBody } from "@qw/dto";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";
import { createVerifyAccountToken } from "../../utils/jwt-helper";
import { sendMail, verifyAccountHtml } from "../../lib/nodemailer";

const createVerificationTokenController: RequestHandler<
  any,
  boolean,
  CreateVerificationTokenBody
> = async (req, res, next) => {
  try {
    const { uid } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: uid },
      select: { email: true },
    });

    if (!user) {
      const error = new AppError("BadRequestException", "Cannot find user");
      return next(error);
    }

    const token = createVerifyAccountToken({ uid });

    const verificationToken = await prisma.verificationToken.create({
      data: {
        token,
      },
    });

    await sendMail(
      user.email,
      "Verify your account",
      verifyAccountHtml(verificationToken.token)
    );

    return res.status(200).json(true);
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default createVerificationTokenController;
