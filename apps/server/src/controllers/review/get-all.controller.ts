import type { RequestHandler } from "express";
import type { GetAllReviewsResponse } from "@qw/dto";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";

const getAllReviewsController: RequestHandler<
  any,
  GetAllReviewsResponse
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        content: true,
        rating: true,
        createdAt: true,
        User: {
          select: {
            name: true,
            photoUrl: true,
          },
        },
        Appointment: {
          select: {
            id: true,
            Service: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json(reviews);
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default getAllReviewsController;
