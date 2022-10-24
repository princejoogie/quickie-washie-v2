import type { CreateBugReportBody, CreateBugReportResponse } from "@qw/dto";
import type { RequestHandler } from "express";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";

const createBugReportController: RequestHandler<
  any,
  CreateBugReportResponse,
  CreateBugReportBody
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    const { body, screenshotUrls, title } = req.body;

    const report = await prisma.bug.create({
      data: {
        body,
        title,
        screenshotUrls: screenshotUrls ?? [],
        reporterId: payload.id,
      },
      select: { id: true },
    });

    return res.status(200).json(report);
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default createBugReportController;
