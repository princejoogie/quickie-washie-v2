import "dotenv/config";
import { PrismaClient } from "@qw/db";

const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
});

const main = async (): Promise<number> => {
  await prisma.$connect();
  console.log("Hello Prince");
  return 0;
};

main().catch(console.error);
