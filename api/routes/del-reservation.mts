import { Request, Response } from "express";
import { Reservation } from "../db.mjs";

export async function deleteReservationRoute(req: Request, res: Response) {
  console.log("DELETE RESERVATION");
  if (!req.userId) {
    return res.status(401).json({ error: "Invalid JWT payload" });
  }
  try {
    const { reservationId } = req.body;

    // Check if reservationId is provided
    if (!reservationId) {
      return res.status(400).json({ error: "Reservation ID is required" });
    }

    // Find the reservation in the database
    const reservation = await Reservation.findByPk(reservationId);

    // Check if the reservation exists
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    if (reservation.userId !== parseInt(req.userId)) {
      return res
        .status(401)
        .json({ error: "User ID does not match reservation ID" });
    }
    // Delete the reservation
    await reservation.destroy();

    // Send success response
    return res
      .status(200)
      .json({ message: "Reservation deleted successfully" });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    return res.status(500).json({ error: "Failed to delete reservation" });
  }
}
