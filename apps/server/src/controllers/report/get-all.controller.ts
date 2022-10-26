import type { RequestHandler } from "express";
import type { GetAllBugReportsResponse } from "@qw/dto";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";

const getAllBugReportsController: RequestHandler<
  any,
  GetAllBugReportsResponse
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    if (payload.privilege !== "ADMIN") {
      const error = new AppError("UnauthorizedException", "Not an admin");
      return next(error);
    }

    const reports = await prisma.bug.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        body: true,
        seen: true,
        createdAt: true,
      },
    });

    return res.status(200).json(reports);
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default getAllBugReportsController;
