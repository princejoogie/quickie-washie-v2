import type { RequestHandler } from "express";
import type {
  DeleteAppointmentParams,
  DeleteAppointmentResponse,
} from "@qw/dto";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";

const deleteAppointmentController: RequestHandler<
  DeleteAppointmentParams,
  DeleteAppointmentResponse
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
    });

    if (!appointment) {
      const error = new AppError("NotFoundException", "Appointment not found");
      return next(error);
    }

    if (payload.privilege !== "ADMIN") {
      const error = new AppError(
        "UnauthorizedException",
        "You are not authorized to delete this appointment"
      );
      return next(error);
    }

    await prisma.appointment.delete({
      where: { id: appointmentId },
    });

    return res.status(200).json(true);
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default deleteAppointmentController;
