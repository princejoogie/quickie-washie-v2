import { z } from "zod";
import { Prisma } from "@qw/db";
import type { Prisma as PrismaType } from "@qw/db";
import type { ValidatorSchema } from "./common";

// CREATE

export const createBugReportBodySchema = z.object({
  body: z.string().min(1),
  title: z.string().min(1),
  screenshotUrls: z.array(z.string().url()).optional(),
});

export type CreateBugReportBody = z.infer<typeof createBugReportBodySchema>;

export const createVehicleReponse = Prisma.validator<PrismaType.BugArgs>()({
  select: { id: true },
});

export type CreateBugReportResponse = PrismaType.BugGetPayload<
  typeof createVehicleReponse
>;

export const createBugReportSchema: ValidatorSchema = {
  body: createBugReportBodySchema,
};

// GET ALL

export const getAllBugReportsResponse = Prisma.validator<PrismaType.BugArgs>()({
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

export type GetAllBugReportsResponse = Array<
  PrismaType.BugGetPayload<typeof getAllBugReportsResponse>
>;
