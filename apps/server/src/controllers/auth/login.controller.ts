import type { RequestHandler } from "express";
import type { LoginResponse, LoginBody } from "../../dtos/auth.dto";

const loginController: RequestHandler<any, LoginResponse, LoginBody> = async (
  _,
  res
) => {
  try {
    return res.status(200).json({ accessToken: "access_token_here" });
  } catch (e) {
    return res.status(400).json({ message: "error" });
  }
};

export default loginController;
