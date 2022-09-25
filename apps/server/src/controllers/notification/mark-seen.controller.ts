import type { RequestHandler } from "express";
import type {
  MarkNotificationSeenBody,
  MarkNotificationSeenResponse,
} from "@qw/dto";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";

const markNotificationController: RequestHandler<
  any,
  MarkNotificationSeenResponse,
  MarkNotificationSeenBody
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    const { notificationIds } = req.body;

    await prisma.notification.updateMany({
      where: { userId: payload.id, id: { in: notificationIds } },
      data: { seen: true },
    });

    return res.status(200).json(true);
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default markNotificationController;
