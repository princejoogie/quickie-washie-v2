import type { RequestHandler } from "express";
import type { GetAllServicesResponse } from "@qw/dto";

import prisma from "../../lib/prisma";
import { AppError } from "../../utils/error";

const getAllServicesController: RequestHandler<
  any,
  GetAllServicesResponse
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    const services = await prisma.service.findMany({
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        name: true,
        basePrice: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(200).json(services);
  } catch (e) {
    const error = new AppError(
      "InternalServerErrorException",
      (e as any).message
    );
    return next(error);
  }
};

export default getAllServicesController;
