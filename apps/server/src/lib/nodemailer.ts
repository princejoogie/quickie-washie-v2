/* eslint-disable @typescript-eslint/no-non-null-assertion */
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env["SMTP_USER"],
    pass: process.env["SMTP_PASS"],
  },
});

export const verifyAccountHtml = (token: string) => {
  const BASE_URL =
    process.env["NODE_ENV"] === "production"
      ? "https://qwashie.up.railway.app"
      : `http://192.168.1.7:${process.env["PORT"]}`;
  return `
  <div>
    <h4>Verify your Quickie Washie account</h1>
    <a href="${BASE_URL}/verify-account?token=${token}">Click here to verify your account</a>
  </div>

  <div>
    <p>If you did not create an account, please ignore this email.</p>
    <p>This link will expire in 24 hours.</p>
  </div>
`;
};

export const sendMail = async (to: string, subject: string, html: string) => {
  const info = await transporter.sendMail({
    from: process.env["SMTP_USER"],
    to,
    subject,
    html,
  });
  console.log("Message sent: %s", info.messageId);
};

export default transporter;
