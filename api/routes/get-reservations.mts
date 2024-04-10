import fs from "fs";
import { Response, Request } from "express";

export function getReservationsRoute(req: Request, res: Response) {
  console.log("GET RESERVATIONS");
  const { month, year } = req.query;

  return res.status(200).json([]);
}
