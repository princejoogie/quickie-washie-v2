import type { RequestHandler } from "express";
import type {
  UpdateAppointmentBody,
  UpdateAppointmentParams,
  UpdateAppointmentResponse,
} from "@qw/dto";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";
import { sendPushNotification } from "../../lib/push-notifications";
import { format } from "date-fns";

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
      include: {
        Service: true,
        Vehicle: true,
      },
    });

    if (!appointment) {
      const error = new AppError("NotFoundException", "Appointment not found");
      return next(error);
    }

    if (appointment.userId !== payload.id) {
      if (payload.privilege !== "ADMIN") {
        const error = new AppError(
          "UnauthorizedException",
          "You are not authorized to access this appointment"
        );
        return next(error);
      }
    }

    const pushNotificationTokens = await prisma.pushNotificationToken.findMany({
      where: { userId: appointment.userId ?? "" },
    });

    if (appointment.Vehicle && appointment.Service && status) {
      const notif = {
        title: `${appointment.Service.name} appointment ${status}`,
        content: `Your appointment on ${appointment.Vehicle?.plateNumber} for ${appointment.Service?.name} is now ${status}`,
      };

      await prisma.notification.create({
        data: {
          userId: appointment.userId,
          title: notif.title,
          content: notif.content,
        },
      });

      sendPushNotification({
        tokens: pushNotificationTokens.map((t) => t.token),
        title: notif.title,
        message: notif.content,
      });
    }

    if (appointment.Vehicle && appointment.Service && date) {
      const _date = new Date(date);
      const notif = {
        title: `${appointment.Service.name} appointment date changed`,
        content: `Your appointment on ${appointment.Vehicle?.plateNumber} for ${
          appointment.Service?.name
        } is now on ${format(_date, "MMM d, yyyy")} at ${format(
          _date,
          "hh:mm aa"
        )}`,
      };

      await prisma.notification.create({
        data: {
          userId: appointment.userId,
          title: notif.title,
          content: notif.content,
        },
      });

      sendPushNotification({
        tokens: pushNotificationTokens.map((t) => t.token),
        title: notif.title,
        message: notif.content,
      });
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        date: date ?? appointment.date,
        status: status ?? appointment.status,
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
