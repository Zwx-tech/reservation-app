import { Response, Request } from "express";
import { User } from "../db.mjs";
import bcrypt from "bcrypt";
import { Optional } from "sequelize";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { env } from "process";

dotenv.config({ path: ".env" });

export async function registerRoute(req: Request, res: Response) {
  console.log("REGISTER ROUTE");
  try {
    const { email, password } = req.body;
    //? Check if user with same email exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    //? Else create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: email,
      password: hashedPassword,
    } as Optional<User, never>);

    //? And authorize him
    const secretToken = env["JWT_SECRET_TOKEN"] || "secret-token";
    const token = jwt.sign({ userId: user.id }, secretToken, {
      expiresIn: "1h",
    });

    //? We shouldn't return user hash
    const safeUser = { email: user.email, id: user.id };
    return res.status(200).json({ token, user: safeUser });
  } catch {
    return res.status(500).json({ error: "Registration failed" });
  }
}
