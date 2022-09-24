import type { RequestHandler } from "express";
import type { GetSalesResponse } from "@qw/dto";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";

const getSalesController: RequestHandler<any, GetSalesResponse> = async (
  req,
  res,
  next
) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    if (payload.privilege !== "ADMIN") {
      const error = new AppError("UnauthorizedException", "Not authorized");
      return next(error);
    }

    const sales = await prisma.appointment.findMany({
      where: { status: "FINISHED" },
      orderBy: { date: "asc" },
      select: {
        id: true,
        date: true,
        Service: {
          select: {
            basePrice: true,
          },
        },
        AdditionalPrice: {
          select: {
            price: true,
          },
        },
      },
    });

    return res.status(200).json(sales);
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default getSalesController;
