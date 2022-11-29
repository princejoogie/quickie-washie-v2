import axios from "axios";
import { z } from "zod";

const API_PUBLIC_BASE = `${process.env.API_BASE_URL}`;

export const serverConstantsSchema = z.object({
  maxBookings: z.number(),
  operatingHours: z.object({
    am: z.object({
      open: z.number(),
      close: z.number(),
    }),
    pm: z.object({
      open: z.number(),
      close: z.number(),
    }),
  }),
});

export const getServerConstants = async () => {
  const url = `${API_PUBLIC_BASE}/constants.json`;
  const result = await axios.get(url);
  return await serverConstantsSchema.parseAsync(result.data);
};
