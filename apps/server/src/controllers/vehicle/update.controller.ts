import type { RequestHandler } from "express";
import type {
  UpdateVehicleParams,
  UpdateVehicleBody,
  UpdateVehicleResponse,
} from "@qw/dto";
import type { VehicleType } from "@qw/db";

import prisma from "../../lib/prisma";
import { AppError } from "../../utils/error";

const updateVehicleController: RequestHandler<
  UpdateVehicleParams,
  UpdateVehicleResponse,
  UpdateVehicleBody
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    const { vehicleId } = req.params;
    const { type, plateNumber } = req.body;

    const vehicle = await prisma.vehicle.update({
      where: { id: vehicleId },
      data: {
        userId: payload.id,
        type: type as VehicleType,
        plateNumber,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        plateNumber: true,
        type: true,
      },
    });

    return res.status(200).json(vehicle);
  } catch (e) {
    const error = new AppError(
      "InternalServerErrorException",
      (e as any).message
    );
    return next(error);
  }
};

export default updateVehicleController;
