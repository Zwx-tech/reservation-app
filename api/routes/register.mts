import { Response, Request } from "express";
import { User } from "../db.mjs";

export function registerRoute(req: Request, res: Response) {
  console.log("REGISTER ROUTE");

  res.send(200);
}
