import type { RequestHandler } from "express";
import type {
  CreateMessageBodySchema,
  CreateMessageParamsSchema,
  CreateMessageResponseSchema,
} from "@qw/dto";

import prisma from "../../../lib/prisma";
import { AppError, handleControllerError } from "../../../utils/error";

const createAppointmentMessageController: RequestHandler<
  CreateMessageParamsSchema,
  CreateMessageResponseSchema,
  CreateMessageBodySchema
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    const { appointmentId } = req.params;
    const { content } = req.body;

    const message = await prisma.message.create({
      data: {
        appointmentId,
        content,
        userId: payload.id,
      },
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

    return res.status(200).json(message);
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default createAppointmentMessageController;
