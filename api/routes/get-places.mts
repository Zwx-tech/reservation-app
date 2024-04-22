import { Request, Response } from "express";
import { Place } from "../db.mjs";

export async function getPlacesRoute(req: Request, res: Response) {
  console.log("GET PLACES");
  try {
    const places = await Place.findAll();
    res.status(200).json(places);
  } catch {
    res.status(500).json({ error: "Failed to fetch places" });
  }
}
