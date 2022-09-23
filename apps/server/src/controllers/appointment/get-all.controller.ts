import type { RequestHandler } from "express";
import type { GetAllAppointmentsResponse } from "@qw/dto";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";

const getAllAppointmentsController: RequestHandler<
  any,
  GetAllAppointmentsResponse
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    if (payload.privilege === "ADMIN") {
      const appointments = await prisma.appointment.findMany({
        orderBy: { date: "asc" },
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

      return res.status(200).json(appointments);
    } else {
      const appointments = await prisma.appointment.findMany({
        where: { userId: payload.id },
        orderBy: { date: "asc" },
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

      return res.status(200).json(appointments);
    }
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default getAllAppointmentsController;
