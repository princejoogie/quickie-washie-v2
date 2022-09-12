/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jwt from "jsonwebtoken";
import type { TokenPayload } from "@qw/dto";

export const HASH_SALT = 10;

export const REFRESH_TOKEN_KEY = "refreshToken";

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env["ACCESS_TOKEN_SECRET"]!) as TokenPayload;
};

export const verifyRefreshToken = (refreshToken: string): TokenPayload => {
  return jwt.verify(
    refreshToken,
    process.env["REFRESH_TOKEN_SECRET"]!
  ) as TokenPayload;
};

export const createAccessToken = (payload: TokenPayload) => {
  return jwt.sign(payload, process.env["ACCESS_TOKEN_SECRET"]!, {
    expiresIn: "10m",
    algorithm: "HS256",
  });
};

export const createRefreshToken = (payload: TokenPayload) => {
  return jwt.sign(payload, process.env["REFRESH_TOKEN_SECRET"]!, {
    expiresIn: "20d",
    algorithm: "HS256",
  });
};

export const createTokens = (payload: TokenPayload) => {
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  return { accessToken, refreshToken };
};
