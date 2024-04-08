import { Routes } from '@angular/router';
import { AddReservationComponent } from './routes/add-reservation/add-reservation.component';
import { ReservationListComponent } from './routes/reservation-list/reservation-list.component';
import { CalendarRouteComponent } from './routes/calendar-route/calendar-route.component';
import { LoginComponent } from './routes/login/login.component';

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
    path: 'calendar-view',
    component: CalendarRouteComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
