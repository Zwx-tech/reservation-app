import { Routes } from '@angular/router';
import { AddReservationComponent } from './routes/add-reservation/add-reservation.component';
import { ReservationListComponent } from './routes/reservation-list/reservation-list.component';

export const routes: Routes = [
  {
    path: 'add-reservation',
    component: AddReservationComponent,
  },
  {
    path: 'reservation-list',
    component: ReservationListComponent,
  },
  {
    path: '',
    redirectTo: 'reservation-list',
    pathMatch: 'full',
  },
];
