import type { RequestHandler } from "express";
import type { CreateAppointmentBody, CreateAppointmentResponse } from "@qw/dto";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";

const createAppointmentController: RequestHandler<
  any,
  CreateAppointmentResponse,
  CreateAppointmentBody
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    const { date, userId, serviceId, vehicleId, additionalPriceId } = req.body;

    const appointment = await prisma.appointment.create({
      data: {
        userId,
        vehicleId,
        serviceId,
        additionalPriceId,
        date,
      },
      include: {
        AdditionalPrice: true,
        Service: true,
        Vehicle: true,
        User: {
          select: {
            id: true,
            email: true,
            name: true,
            licenseUrl: true,
            photoUrl: true,
          },
        },
      },
    });

    return res.status(200).json(appointment);
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default createAppointmentController;
