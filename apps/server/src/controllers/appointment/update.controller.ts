import type { RequestHandler } from "express";
import type {
  UpdateAppointmentBody,
  UpdateAppointmentParams,
  UpdateAppointmentResponse,
} from "@qw/dto";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";

const updateAppointmentController: RequestHandler<
  UpdateAppointmentParams,
  UpdateAppointmentResponse,
  UpdateAppointmentBody
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    const { appointmentId } = req.params;
    const { date, status } = req.body;

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      const error = new AppError("NotFoundException", "Appointment not found");
      return next(error);
    }

    if (payload.privilege !== "ADMIN") {
      const error = new AppError(
        "UnauthorizedException",
        "You are not authorized to access this appointment"
      );
      return next(error);
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        date,
        status,
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

    return res.status(200).json(updatedAppointment);
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default updateAppointmentController;
