import type { RequestHandler } from "express";
import type { GetAllNotificationsResponse } from "@qw/dto";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";

const getAllNotificationsController: RequestHandler<
  any,
  GetAllNotificationsResponse
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    const notifications = await prisma.notification.findMany({
      where: { userId: payload.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        seen: true,
        title: true,
        createdAt: true,
        content: true,
      },
    });

    return res.status(200).json(notifications);
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default getAllNotificationsController;
