import fs from 'fs';
import { Response, Request } from 'express';

export function addReservation(req: Request, res: Response) {
  console.log('ADD RESERVATION');
  const reservation = { id: Date.now(), userID: 0, ...req.body };

  const fileName = `./reservations/reservations_${reservation.date.day}_${reservation.date.month}_${reservation.date.year}.json`;
  if (!fs.existsSync(fileName)) {
    // create file and add reservation to it
    fs.writeFile(fileName, JSON.stringify([reservation]), (err) => {
      if (err) {
        res.json({ status: 'error', message: 'Failed to add reservation' });
      } else {
        res.json({ status: 'success' });
      }
    });
    return;
  }

  // open file and check if there is not reservations with same date
  const reservationsInFile: Reservation[] = JSON.parse(
    fs.readFileSync(fileName, 'utf-8')
  );
  if (reservationsInFile.find((r) => r.date.hour === reservation.date.hour)) {
    res.json({
      status: 'error',
      message: 'There is already reservation for this hour',
    });
    return;
  }
  fs.writeFile(
    fileName,
    JSON.stringify([...reservationsInFile, reservation]),
    (err: any) => {
      if (err) {
        res.json({ status: 'error', message: 'Failed to add reservation' });
      } else {
        res.json({ status: 'success' });
      }
    }
  );
  return;
}
