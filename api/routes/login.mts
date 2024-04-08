import { Response, Request } from "express";
import { db, validateConnection } from "../db.mjs";

export function loginRoute(req: Request, res: Response) {
  console.log("LOGIN ROUTE");
  validateConnection();
  res.send(200);
}
