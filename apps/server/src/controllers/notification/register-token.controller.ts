import type { RequestHandler } from "express";
import type { RegisterTokenBody, RegisterTokenResponse } from "@qw/dto";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";

const registerPushNotificationTokenController: RequestHandler<
  any,
  RegisterTokenResponse,
  RegisterTokenBody
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    const { notificationToken } = req.body;

    const token = await prisma.pushNotificationToken.findUnique({
      where: { token: notificationToken },
    });

    if (!token) {
      await prisma.pushNotificationToken.create({
        data: {
          token: notificationToken,
          userId: payload.id,
        },
      });
    } else if (token.userId !== payload.id) {
      await prisma.pushNotificationToken.update({
        where: { token: notificationToken },
        data: { userId: payload.id },
      });
    }

    return res.status(200).json(true);
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default registerPushNotificationTokenController;
