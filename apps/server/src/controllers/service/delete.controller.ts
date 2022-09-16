import type { RequestHandler } from "express";
import type { DeleteServiceParams, DeleteServiceResponse } from "@qw/dto";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";

const deleteServiceController: RequestHandler<
  DeleteServiceParams,
  DeleteServiceResponse
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    const { serviceId } = req.params;

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      const error = new AppError("NotFoundException", "Service not found");
      return next(error);
    }

    if (payload.privilege !== "ADMIN") {
      const error = new AppError(
        "UnauthorizedException",
        "You are not authorized to delete this service"
      );
      return next(error);
    }

    await prisma.service.delete({
      where: { id: serviceId },
    });

    return res.status(200).json(true);
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default deleteServiceController;
