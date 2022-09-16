import { PrismaClient } from "@qw/db";

const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
  errorFormat: "pretty",
});

export default prisma;
