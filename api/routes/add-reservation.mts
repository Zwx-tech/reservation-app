import fs from "fs";
import { Response, Request } from "express";

export function addReservationRoute(req: Request, res: Response) {
  console.log("ADD RESERVATION");
  return res.status(200);
}
