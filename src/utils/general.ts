import { NextFunction } from "express";

export const createError = (
  message: string,
  code: number,
  next: NextFunction
) => {
  const error = new Error(message) as any;
  error.statusCode = code;
  next(error);
};
