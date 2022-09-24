import type { RequestHandler } from "express";
import type {
  GetAppointmentByIdParams,
  GetAppointmentByIdResponse,
} from "@qw/dto";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";

const getAppointmentByIdController: RequestHandler<
  GetAppointmentByIdParams,
  GetAppointmentByIdResponse
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    const { appointmentId } = req.params;

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      select: {
        _count: {
          select: {
            messages: { where: { seen: false } },
          },
        },
        id: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        date: true,
        documents: true,
        AdditionalPrice: true,
        Service: true,
        Vehicle: true,
        User: {
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
            licenseUrl: true,
            photoUrl: true,
          },
        },
      },
    });

    if (!appointment) {
      const error = new AppError("NotFoundException", "Appointment not found");
      return next(error);
    }

    return res.status(200).json(appointment);
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default getAppointmentByIdController;
