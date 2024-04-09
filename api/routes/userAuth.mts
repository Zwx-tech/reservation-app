import { Response, Request } from "express";
import { User } from "../db.mjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { env } from "process";

dotenv.config({ path: ".env" });

export async function loginRoute(req: Request, res: Response) {
  try {
    //? Extract and verify JWT token
    const { token } = req.body;
    const secretToken = env["JWT_SECRET_TOKEN"] || "secret-token";
    const decoded = jwt.verify(token, secretToken) as { userId: string };
    const userId = decoded.userId;
    //? Return user
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(401).json({ error: "User does not exists" });
    }
    //? We shouldn't return user hash
    const safeUser = { email: user.email, id: user.id };
    return res.status(200).json({ safeUser });
  } catch {
    return res.status(500).json({ error: "Login failed" });
  }
}
