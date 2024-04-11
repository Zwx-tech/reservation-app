import { Component, effect, inject, ViewChild } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { HourPickerComponent } from '../../components/hour-picker/hour-picker.component';
import { ReservationCardComponent } from '../../components/reservation-card/reservation-card.component';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs';
@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [
    CalendarComponent,
    HourPickerComponent,
    ReservationCardComponent,
    ButtonModule,
  ],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.scss',
})
export class ReservationListComponent {
  selectedDate: Date | null = null;
  selectedHour: string | null = null;
  selectedReservation: Reservation | null = null;

  reservedDates: ReservationDate[] = [];
  reservedHours: string[] = [];

  @ViewChild(CalendarComponent) calendar!: CalendarComponent;
  @ViewChild(HourPickerComponent) hourPicker!: HourPickerComponent;
  @ViewChild(ReservationCardComponent)
  reservationCard!: ReservationCardComponent;

  allReservations: Reservation[] = [];

  reservationService = inject(ReservationService);
  authService = inject(AuthService);
  router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authService.userSignal() === null) {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
    const today = new Date();
    this.refreshReservations(today.getMonth(), today.getFullYear());
  }

  ngAfterViewInit() {
    this.calendar.calendarViewChange.subscribe(({ month, year }) => {
      this.refreshReservations(month, year);
    });
  }

  refreshReservations(month: number, year: number) {
    this.reservationService
      .getReservations({ month, year })
      .subscribe((reservations) => {
        console.log(reservations);
        this.allReservations = reservations;
        this.reservedDates = reservations.map(
          (reservation) => reservation.date
        );
      });
  }

  onCardChange() {
    if (this.selectedDate === null) return;
    this.refreshReservations(
      this.selectedDate.getMonth(),
      this.selectedDate.getFullYear()
    );
    this.resetView();
  }

  resetView() {
    this.reservationCard.disabled = true;
    this.hourPicker.disabled = true;
    this.selectedHour = null;
    this.reservedHours = [];
    this.selectedDate = null;
  }

  selectedDateChange(e: any) {
    // reset everything
    this.reservationCard.disabled = true;
    this.selectedHour = null;
    // disable/enable hour picker
    if (this.selectedDate === null) {
      this.hourPicker.disabled = true;
      return;
    }
    // console.log(this.calendar);
    this.refreshReservations(
      this.selectedDate.getMonth(),
      this.selectedDate.getFullYear()
    );
    this.hourPicker.disabled = false;
    // adjust reservedHours array
    this.reservedHours = this.reservedDates
      .filter((date) => date.day == this.selectedDate?.getDate())
      .map((date) => date.hour);
    console.log(this.reservedHours);
  }

  getReservationByDate(reservationDate: Date, reservationHour: string) {
    const day = reservationDate.getDate();

    return this.allReservations.find(
      ({ date }) => date.hour == reservationHour && date.day == day
    );
  }

  selectedHourChange(hour: ReservationStatus<string>) {
    this.selectedHour = hour.element;

    if (this.selectedDate === null) return;
    //* show reservation card and clear its content
    this.reservationCard.disabled = false;
    this.selectedReservation = null;

    //* if there is not reservation return
    if (!hour.status) return;

    //* There has to be such reservation, so we can safely use ! operator
    this.selectedReservation = this.getReservationByDate(
      this.selectedDate,
      hour.element
    )!;
  }

  //MARK: BOOK RESERVATION
  bookNewReservation() {
    if (!this.selectedDate || !this.selectedHour) return;
    this.router.navigate([
      '/add-reservation',
      {
        hour: this.selectedHour,
        day: this.selectedDate.getDate(),
        month: this.selectedDate.getMonth(),
        year: this.selectedDate.getFullYear(),
      },
    ]);
  }
}
