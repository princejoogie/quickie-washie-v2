import type { RequestHandler } from "express";
import type { UnregisterTokenBody, UnregisterTokenResponse } from "@qw/dto";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";

const unregisterPushNotificationTokenController: RequestHandler<
  any,
  UnregisterTokenResponse,
  UnregisterTokenBody
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    const { notificationToken } = req.body;

    await prisma.pushNotificationToken.delete({
      where: { token: notificationToken },
    });

    return res.status(200).json(true);
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default unregisterPushNotificationTokenController;
