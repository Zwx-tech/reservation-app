import { Response, Request } from "express";
import { User } from "../db.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { env } from "process";

dotenv.config({ path: ".env" });
export async function loginRoute(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const secretToken = env["JWT_SECRET_TOKEN"] || "secret-token";
    const token = jwt.sign({ userId: user.id }, secretToken, {
      expiresIn: "1h",
    });
    return res.status(200).json({ token });
  } catch {
    return res.status(500).json({ error: "Login failed" });
  }
}
