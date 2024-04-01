import { Component, ViewChild } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { HourPickerComponent } from '../../components/hour-picker/hour-picker.component';
import { ReservationCardComponent } from '../../components/reservation-card/reservation-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [CalendarComponent, HourPickerComponent, ReservationCardComponent],
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

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    const today = new Date();
    this.refreshReservations(today.getMonth(), today.getFullYear());
  }

  refreshReservations(month: number, year: number) {
    this.reservationService
      .getReservations({ month, year })
      .subscribe((reservations) => {
        this.allReservations = reservations;
        this.reservedDates = reservations.map(
          (reservation) => reservation.date
        );
      });
  }

  selectedDateChange() {
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