import type {
  CreateReviewBody,
  CreateReviewParams,
  CreateReviewResponse,
} from "@qw/dto";
import type { RequestHandler } from "express";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";

const createReviewController: RequestHandler<
  CreateReviewParams,
  CreateReviewResponse,
  CreateReviewBody
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    const { content, rating } = req.body;
    const { appointmentId } = req.params;

    const review = await prisma.review.create({
      data: {
        content,
        rating,
        userId: payload.id,
        Appointment: {
          connect: {
            id: appointmentId,
          },
        },
      },
      select: {
        id: true,
        content: true,
        rating: true,
        createdAt: true,
      },
    });

    return res.status(200).json(review);
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default createReviewController;
