import { addReservationRoute } from "./routes/add-reservation.mjs";
import { getReservationsRoute } from "./routes/get-reservations.mjs";
import { loginRoute } from "./routes/login.mjs";

export const routes = {
  "reservations/get": { routeFunc: addReservationRoute, method: "get" },
  "reservations/add": { routeFunc: getReservationsRoute, method: "post" },
  "auth/login": { routeFunc: loginRoute, method: "get" },
};
