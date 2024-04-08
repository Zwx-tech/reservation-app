import { addReservationRoute } from "./routes/add-reservation.mjs";
import { getReservationsRoute } from "./routes/get-reservations.mjs";
import { loginRoute } from "./routes/login.mjs";
import { registerRoute } from "./routes/register.mjs";

export const routes = {
  "reservations/get": {
    routeFunc: getReservationsRoute,
    method: "get",
    protected: false,
  },
  "reservations/add": {
    routeFunc: addReservationRoute,
    method: "post",
    protected: true,
  },
  "auth/login": {
    routeFunc: loginRoute,
    method: "post",
    protected: false,
  },
  "auth/register": {
    routeFunc: registerRoute,
    method: "post",
    protected: false,
  },
};
