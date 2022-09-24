import type { RequestHandler } from "express";
import type { UpdateProfileBody, UpdateProfileResponse } from "@qw/dto";

import prisma from "../../../lib/prisma";
import { AppError, handleControllerError } from "../../../utils/error";

const profileController: RequestHandler<
  any,
  UpdateProfileResponse,
  UpdateProfileBody
> = async (req, res, next) => {
  try {
    const payload = req.tokenPayload;

    if (!payload) {
      const error = new AppError("UnauthorizedException", "No token provided");
      return next(error);
    }

    const { name, imageUrl, licenseUrl } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!user) {
      const error = new AppError("NotFoundException", "User does not exist");
      return next(error);
    }

    const updatedUser = await prisma.user.update({
      where: { id: payload.id },
      data: {
        name: name ?? user.name,
        photoUrl: imageUrl ?? user.photoUrl,
        licenseUrl: licenseUrl ?? user.licenseUrl,
      },
      select: {
        id: true,
        email: true,
        photoUrl: true,
        name: true,
        privilege: true,
        licenseUrl: true,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (e) {
    handleControllerError(e, next);
  }
};

export default profileController;
