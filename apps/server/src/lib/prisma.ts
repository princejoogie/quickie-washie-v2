import { PrismaClient } from "@qw/db";

const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
});

export default prisma;
