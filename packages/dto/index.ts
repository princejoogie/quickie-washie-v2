export * from "./src/analytics";
export * from "./src/appointment";
export * from "./src/auth";
export * from "./src/common";
export * from "./src/document";
export * from "./src/message";
export * from "./src/notification";
export * from "./src/review";
export * from "./src/service";
export * from "./src/vehicle";

export interface TokenPayload {
  id: string;
  privilege: "ADMIN" | "CUSTOMER";
}
