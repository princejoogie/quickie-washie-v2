import type { RequestHandler } from "express";
import type { MarkReportSeenBody, MarkReportSeenResponse } from "@qw/dto";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";

const markBugReportController: RequestHandler<
  any,
  MarkReportSeenResponse,
  MarkReportSeenBody
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    const { reportIds } = req.body;

    await prisma.bug.updateMany({
      where: { id: { in: reportIds } },
      data: { seen: true },
    });

    return res.status(200).json(true);
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default markBugReportController;
