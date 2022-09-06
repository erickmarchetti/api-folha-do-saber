import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        isAdm: boolean;
        userId: string;
        isWriter: boolean;
      };
    }
  }
}
