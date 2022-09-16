import type { RequestHandler } from "express";
import type { DeleteVehicleParams, DeleteVehicleResponse } from "@qw/dto";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";

const deleteVehicleController: RequestHandler<
  DeleteVehicleParams,
  DeleteVehicleResponse
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    const { vehicleId } = req.params;

    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });

    if (!vehicle) {
      const error = new AppError("NotFoundException", "Vehicle not found");
      return next(error);
    }

    if (vehicle.userId !== payload.id) {
      if (payload.privilege !== "ADMIN") {
        const error = new AppError(
          "UnauthorizedException",
          "You are not authorized to delete this vehicle"
        );
        return next(error);
      }
    }

    await prisma.vehicle.delete({
      where: { id: vehicleId },
    });

    return res.status(200).json(true);
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default deleteVehicleController;
