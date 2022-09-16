import type { RequestHandler } from "express";
import type {
  UpdateServiceBody,
  UpdateServiceResponse,
  UpdateServiceParams,
} from "@qw/dto";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";
import type { Prisma, VehicleType } from "@qw/db";

const updateServiceController: RequestHandler<
  UpdateServiceParams,
  UpdateServiceResponse,
  UpdateServiceBody
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    const { serviceId } = req.params;
    const { name, basePrice, description, additionalPrices } = req.body;

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      include: { additionalPrices: true },
    });

    if (!service) {
      const error = new AppError("NotFoundException", "Service not found");
      return next(error);
    }

    if (payload.privilege !== "ADMIN") {
      const error = new AppError(
        "UnauthorizedException",
        "You are not authorized to access this service"
      );
      return next(error);
    }

    if (additionalPrices) {
      await prisma.additionalPrice.deleteMany({
        where: { serviceId },
      });

      await prisma.additionalPrice.createMany({
        data: additionalPrices.map((e) => {
          const q: Prisma.AdditionalPriceCreateManyInput = {
            serviceId,
            vehicleType: e.vehicleType as VehicleType,
            price: e.price,
          };

          return q;
        }),
      });
    }

    const updatedService = await prisma.service.update({
      where: { id: serviceId },
      data: {
        name: name ?? service.name,
        basePrice: basePrice ?? service.basePrice,
        description: description ?? service.description,
      },
      select: {
        id: true,
        name: true,
        basePrice: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(200).json(updatedService);
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default updateServiceController;
