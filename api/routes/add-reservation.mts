import fs from "fs";
import { Response, Request } from "express";
import { Reservation } from "../db.mjs";

export async function addReservationRoute(req: Request, res: Response) {
  console.log("ADD RESERVATION");
  const reservationData: ReservationData = { discountCode: null, ...req.body };
  const userId = req.userId;

  if (userId === undefined)
    return res.status(400).json({ error: "Invalid user payload" });

  try {
    const reservation = await Reservation.create({
      userId: parseInt(userId),
      firstName: reservationData.firstName,
      secondName: reservationData.secondName,
      email: reservationData.email,
      paymentMethod: reservationData.paymentMethod,
      discountCode: reservationData.discountCode,
      additionalInformation: reservationData.additionalInformation,
      reservationDate: new Date(
        reservationData.date.year,
        reservationData.date.month,
        reservationData.date.day,
        parseInt(reservationData.date.hour)
      ),
    } as ReservationModel);

    return res.status(200).json({ message: "Reservation added successfully" });
  } catch (err) {
    console.log("ERROR WHEN ADDING RESERVATION ", err);
    return res.status(500).json({ error: "Failed to add reservation" });
  }
}
