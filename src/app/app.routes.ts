import { Routes } from '@angular/router';
import { AddReservationComponent } from './routes/add-reservation/add-reservation.component';
import { ReservationListComponent } from './routes/reservation-list/reservation-list.component';
import { CalendarRouteComponent } from './routes/calendar-route/calendar-route.component';
import { LoginComponent } from './routes/login/login.component';
import { RegisterComponent } from './routes/register/register.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { LandingRouteComponent } from './routes/landing-route/landing-route.component';
import { OfferRouteComponent } from './routes/offer-route/offer-route.component';

export const routes: Routes = [
  {
    path: 'add-reservation',
    component: AddReservationComponent,
  },
  {
    path: 'reservation-list',
    component: ReservationListComponent,
    canActivate: [authGuardGuard],
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
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: LandingRouteComponent,
  },
  {
    path: 'offer',
    component: OfferRouteComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
