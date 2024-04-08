//* imports
import cors from 'cors';
import { routes } from './api/routes.mjs';
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
//? it will match to everything apart from /api/**/* routes
const angularRoutes = /^(?!\/api(\/|$)).*$/;

app.all(angularRoutes, (req, res) => {
  res.status(200).sendFile(`/`, { root: app_folder });
});

//* Match api all routes
for (const [routeName, routeOptions] of Object.entries(routes)) {
  console.log(
    `[ROUTE FOUND ${routeOptions.method.toUpperCase()}]: /api/${routeName}`
  );
  switch (routeOptions.method) {
    case 'post':
      app.post(`/api/${routeName}`, routeOptions.routeFunc);
      break;
    case 'get':
      app.get(`/api/${routeName}`, routeOptions.routeFunc);
      break;
    default:
      console.log('Unsupported route method');
      break;
  }
}

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
