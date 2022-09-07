import { ExpoConfig } from "@expo/config";
import { z } from "zod";
import "dotenv/config";

export const envSchema = z.object({
  API_BASE_URL: z.string().url(),
});

export default ({ config }: any): ExpoConfig => {
  try {
    const schema = envSchema.parse(process.env);
    return {
      ...config,
      extra: {
        API_BASE_URL: schema.API_BASE_URL,
      },
    };
  } catch (e) {
    if (e instanceof z.ZodError) {
      console.log("------- INVALID .env file -------");
      Object.entries(e.flatten().fieldErrors).forEach(([k, errs]) => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.log(`${k}: ${errs?.join(",")}`);
      });
      console.log("---------------------------------");
      return process.exit(1);
    }

    console.log("Something went wrong.");
    console.error(e);
    return process.exit(1);
  }
};
