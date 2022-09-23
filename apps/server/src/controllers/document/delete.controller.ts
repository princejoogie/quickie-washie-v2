import type { RequestHandler } from "express";
import type { DeleteDocumentParams, DeleteDocumentResponse } from "@qw/dto";

import prisma from "../../lib/prisma";
import { AppError, handleControllerError } from "../../utils/error";

const deleteDocumentController: RequestHandler<
  DeleteDocumentParams,
  DeleteDocumentResponse
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    const { documentId } = req.params;

    const document = await prisma.document.findUnique({
      where: { id: documentId },
    });

    if (!document) {
      const error = new AppError("NotFoundException", "Document not found");
      return next(error);
    }

    if (document.userId !== payload.id) {
      if (payload.privilege !== "ADMIN") {
        const error = new AppError(
          "UnauthorizedException",
          "You are not authorized to delete this document"
        );
        return next(error);
      }
    }

    await prisma.document.delete({
      where: { id: documentId },
    });

    return res.status(200).json(true);
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default deleteDocumentController;
