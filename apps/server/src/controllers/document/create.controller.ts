import type { RequestHandler } from "express";
import type { CreateDocumentBody } from "@qw/dto";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";

const createDocumentController: RequestHandler<
  any,
  any,
  CreateDocumentBody
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    const { documents, appointmentId, userId } = req.body;

    const docs = await prisma.document.createMany({
      data: documents.map((e: any) => ({
        downloadUrl: e.downloadUrl,
        mimeType: e.mimeType,
        name: e.name,
        appointmentId,
        userId,
      })),
      skipDuplicates: true,
    });

    return res.status(200).json(docs.count);
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default createDocumentController;
