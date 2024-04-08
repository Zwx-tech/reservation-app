//* imports
import cors from 'cors';
import fs from 'fs';
import express from 'express';
import compression from 'compression';

//? CONFIG
const app_folder = './dist/static';
const PORT = 3000;

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 204,
  methods: 'GET, POST, PUT, DELETE',
};

const staticOptions = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['html', 'js', 'scss', 'css'],
  index: false,
  maxAge: '1y',
  redirect: true,
};

//? CREATE APP
const app = express();
//* prevent cors errors
app.use(cors());

//* middleware of some sort, I dunno
app.use(compression());

app.use(express.static(app_folder, staticOptions));

//* handle post
app.use(express.json());

//* angular route regex
const regex = /^(?!\/api(\/|$)).*$/;

app.all(regex, (req, res) => {
  res.status(200).sendFile(`/`, { root: app_folder });
});

app.get('/api/get-reservations', (req, res) => {
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
});

app.post('/api/add-reservation', (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
