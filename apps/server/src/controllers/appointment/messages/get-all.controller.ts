import type { RequestHandler } from "express";
import type {
  GetAllMessagesParamsSchema,
  GetAllMessagesResponseSchema,
} from "@qw/dto";

import prisma from "../../../lib/prisma";
import { AppError, handleControllerError } from "../../../utils/error";

const getAppointmentMessagesController: RequestHandler<
  GetAllMessagesParamsSchema,
  GetAllMessagesResponseSchema
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    const { appointmentId } = req.params;

    const messages = await prisma.message.findMany({
      where: { appointmentId },
      orderBy: { createdAt: "asc" },
      select: {
        content: true,
        createdAt: true,
        seen: true,
        User: {
          select: {
            photoUrl: true,
            name: true,
            privilege: true,
            id: true,
          },
        },
      },
    });

    return res.status(200).json(messages);
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default getAppointmentMessagesController;
