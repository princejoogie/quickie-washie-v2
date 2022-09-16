import type { RequestHandler } from "express";
import type { CreateVehicleBody, CreateVehicleResponse } from "@qw/dto";
import type { VehicleType } from "@qw/db";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";

const createVehicleController: RequestHandler<
  any,
  CreateVehicleResponse,
  CreateVehicleBody
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    const { plateNumber, type, model } = req.body;

    const vehicle = await prisma.vehicle.create({
      data: {
        userId: payload.id,
        type: type as VehicleType,
        plateNumber,
        model,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        plateNumber: true,
        model: true,
        type: true,
      },
    });

    return res.status(200).json(vehicle);
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default createVehicleController;
