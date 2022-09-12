import type { RequestHandler } from "express";
import type { GetAllVehiclesResponse } from "@qw/dto";

import prisma from "../../lib/prisma";
import { AppError } from "../../utils/error";

const getAllVehiclesController: RequestHandler<
  any,
  GetAllVehiclesResponse
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    const vehicles = await prisma.vehicle.findMany({
      where: { userId: payload.id },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        plateNumber: true,
        type: true,
      },
    });

    return res.status(200).json(vehicles);
  } catch (e) {
    const error = new AppError(
      "InternalServerErrorException",
      (e as any).message
    );
    return next(error);
  }
};

export default getAllVehiclesController;
