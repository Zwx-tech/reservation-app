import fs from 'fs';
import { Response, Request } from 'express';
export function getReservations(req: Request, res: Response) {
  console.log('GET RESERVATIONS');
  const { month, year } = req.query;
  const fileNameHelper = (day: number) =>
    `./reservations/reservations_${day}_${month}_${year}.json`;

  const response = [];
  for (let day = 1; day < 32; day++) {
    const fileName = fileNameHelper(day);
    if (!fs.existsSync(fileName)) continue;
    response.push(...JSON.parse(fs.readFileSync(fileName, 'utf-8')));
  }

  res.json(response);
}
