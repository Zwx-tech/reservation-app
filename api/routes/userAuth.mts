import { Response, Request } from "express";
import { User } from "../db.mjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { env } from "process";

dotenv.config({ path: ".env" });

export async function verifyUserRoute(req: Request, res: Response) {
  console.log("VALIDATING TOKEN");
  try {
    //? Extract and verify JWT token
    const { token } = req.body;
    //* If token is null it's invalid
    if (token === "") {
      return res.status(401).json({ error: "Invalid token" });
    }
    console.log(token);
    const secretToken = env["JWT_SECRET_TOKEN"] || "secret-token";
    const decoded = jwt.verify(token, secretToken) as JWTPayload;
    const userId = decoded.userId;
    //? Return user
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(401).json({ error: "User does not exists" });
    }
    //? We shouldn't return user hash
    const safeUser = { email: user.email, id: user.id };
    return res.status(200).json({ user: safeUser });
  } catch {
    return res.status(500).json({ error: "Login failed" });
  }
}
