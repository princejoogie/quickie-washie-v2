export * from "./src/auth";
export * from "./src/common";

export interface TokenPayload {
  id: string;
  privilege: string;
}