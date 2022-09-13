import type { RequestHandler } from "express";
import type { CreateServiceBody, CreateServiceResponse } from "@qw/dto";
import type { VehicleType } from "@qw/db";

import prisma from "../../lib/prisma";
import { AppError } from "../../utils/error";

const createServiceController: RequestHandler<
  any,
  CreateServiceResponse,
  CreateServiceBody
> = async (req, res, next) => {
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

    const { basePrice, description, name, additionalPrices } = req.body;

    const service = await prisma.service.create({
      data: {
        name,
        basePrice,
        description,
        additionalPrices: {
          createMany: {
            data: additionalPrices.map((price) => ({
              price: price.price,
              vehicleType: price.vehicleType as VehicleType,
            })),
          },
        },
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

    return res.status(200).json(service);
  } catch (e) {
    const error = new AppError(
      "InternalServerErrorException",
      (e as any).message
    );
    return next(error);
  }
};

export default createServiceController;
