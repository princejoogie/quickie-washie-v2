import type { RequestHandler } from "express";
import type { GetBugReportByIdParams, GetBugReportByIdResponse } from "@qw/dto";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";

const getBugReportByIdController: RequestHandler<
  GetBugReportByIdParams,
  GetBugReportByIdResponse
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    const { reportId } = req.params;

    const report = await prisma.bug.findUnique({
      where: { id: reportId },
      select: {
        id: true,
        title: true,
        body: true,
        seen: true,
        createdAt: true,
        screenshotUrls: true,
        Reporter: {
          select: {
            id: true,
            name: true,
            photoUrl: true,
            phone: true,
          },
        },
      },
    });

    if (!report) {
      const error = new AppError("NotFoundException", "Bug Report not found");
      return next(error);
    }

    return res.status(200).json(report);
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default getBugReportByIdController;
