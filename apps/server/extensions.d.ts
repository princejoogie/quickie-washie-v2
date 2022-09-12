declare namespace Express {
  export interface Request {
    tokenPayload: { id: string; privilege: "ADMIN" | "CUSTOMER" } | undefined;
  }
}
