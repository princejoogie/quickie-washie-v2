declare namespace Express {
  export interface Request {
    tokenPayload: { id: string; privilege: string } | undefined;
  }
}
