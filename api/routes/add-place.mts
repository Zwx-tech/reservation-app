import { Response, Request } from "express";
import { Place, User } from "../db.mjs";

export async function addPlaceRoute(req: Request, res: Response) {
  console.log("ADD PLACE");
  const placeData: PlaceFormData = { ...req.body };
  console.log(placeData);
  const userId = req.userId;

  if (userId === undefined)
    return res.status(400).json({ error: "Invalid user payload" });
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return res.status(400).json({ error: "Invalid user payload" });
  }
  if (!user?.isAdmin) {
    return res.status(401).json({ error: "User not authorized" });
  }
  const place = Place.create({
    ...placeData,
  } as Place);
  try {
    return res.status(200).json({ message: "Place added successfully" });
  } catch (err) {
    console.log("ERROR WHEN ADDING PLACE ", err);
    return res.status(500).json({ error: "Failed to add place" });
  }
}
