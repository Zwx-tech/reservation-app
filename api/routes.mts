import { addReservation } from "./routes/add-reservation.mjs";
import { getReservations } from "./routes/get-reservations.mjs";

export const routes = {
  "get-reservations": { routeFunc: getReservations, method: "get" },
  "add-reservation": { routeFunc: addReservation, method: "post" },
};
