import { Request, Response } from "express";
import { Op } from "sequelize";
import { Reservation } from "../db.mjs";
export async function getReservationsRoute(req: Request, res: Response) {
  console.log("GET RESERVATIONS");

  try {
    const { month, year, placeId } = req.query;

    // Validate month and year parameters
    if (!month || !year) {
      return res
        .status(400)
        .json({ error: "Month and year parameters are required" });
    }

    // Convert month and year to numbers
    //* Add +1 cause normally dates are stored in range (0;11)
    const monthNumber = parseInt(month as string) + 1;
    const yearNumber = parseInt(year as string);

    // Validate month and year values
    if (isNaN(monthNumber) || isNaN(yearNumber)) {
      return res.status(400).json({ error: "Invalid month or year format" });
    }

    //? Get reservations for the specified month and year from the database
    const reservations = await Reservation.findAll({
      where: {
        placeId: placeId as string, // Ensure placeId is of type string
        reservationDate: {
          [Op.and]: [
            { [Op.gte]: new Date(yearNumber, monthNumber - 1, 1) },
            { [Op.lt]: new Date(yearNumber, monthNumber, 1) },
          ],
        },
      },
    });
    //* Send the reservations as JSON response
    return res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return res.status(500).json({ error: "Failed to fetch reservations" });
  }
}
