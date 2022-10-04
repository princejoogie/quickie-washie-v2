import "dotenv/config";
import { sendMail, verifyAccountHtml } from "../src/lib/nodemailer";
import { createVerifyAccountToken } from "../src/utils/jwt-helper";

const main = async () => {
  console.log({
    user: process.env["SMTP_USER"],
    pass: process.env["SMTP_PASS"],
  });

  const token = createVerifyAccountToken({ uid: "123" });

  await sendMail(
    "softdes23@gmail.com",
    "Verify your account",
    verifyAccountHtml(token)
  );
};

main().catch(console.error);
