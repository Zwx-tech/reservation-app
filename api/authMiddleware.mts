import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import dotenv from "dotenv";
import { env } from "process";

dotenv.config({ path: ".env" });

export function verifyJWTToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //* extract token
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    //* Validate token
    const secretToken = env["JWT_SECRET_TOKEN"] || "secret-token";
    //* Override req data so it will contain userId
    const decoded = jwt.verify(token, secretToken) as JWTPayload;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}
