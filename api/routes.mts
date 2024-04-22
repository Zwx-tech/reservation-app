import { ServerRoute } from "../types/server";
import { addReservationRoute } from "./routes/add-reservation.mjs";
import { deleteReservationRoute } from "./routes/del-reservation.mjs";
import { getReservationsRoute } from "./routes/get-reservations.mjs";
import { getPlacesRoute } from "./routes/get-places.mjs";
import { loginRoute } from "./routes/login.mjs";
import { registerRoute } from "./routes/register.mjs";
import { verifyUserRoute } from "./routes/userAuth.mjs";
import { addPlaceRoute } from "./routes/add-place.mjs";

export const routes: { [k: string]: ServerRoute } = {
  "reservations/get": {
    routeFunc: getReservationsRoute,
    method: "get",
    protected: true,
  },
  "reservations/add": {
    routeFunc: addReservationRoute,
    method: "post",
    protected: true,
  },
  "reservations/delete": {
    routeFunc: deleteReservationRoute,
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
  "auth/user": {
    routeFunc: verifyUserRoute,
    method: "post",
    protected: false,
  },
  "place/getAll": {
    routeFunc: getPlacesRoute,
    method: "get",
    protected: false,
  },
  "place/add": {
    routeFunc: addPlaceRoute,
    method: "post",
    protected: true,
  },
};
