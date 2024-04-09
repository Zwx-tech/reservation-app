import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";

export function verifyJWTToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // const token = req.header("Authorization");
  console.log(req.headers);
  next();
}
