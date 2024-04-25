import {
  Component,
  effect,
  inject,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { HourPickerComponent } from '../../components/hour-picker/hour-picker.component';
import { ReservationCardComponent } from '../../components/reservation-card/reservation-card.component';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { StepperModule } from 'primeng/stepper';
import { CommonModule } from '@angular/common';
import { PlaceListComponent } from '../../components/place-list/place-list.component';
import { PlaceService } from '../../services/place.service';
import { OfferCardComponent } from '../../components/offer-card/offer-card.component';
import { MenuComponent } from '../../components/menu/menu.component';
@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [
    CalendarComponent,
    HourPickerComponent,
    ReservationCardComponent,
    ButtonModule,
    StepperModule,
    CommonModule,
    PlaceListComponent,
    OfferCardComponent,
    MenuComponent,
  ],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ReservationListComponent {
  placeList: Place[] = [];
  placeId: null | string = null;

  //* STEP VIEW LIST
  //* 0 - OFFER VIEW - here we display all offers
  //* 1 - CALENDAR VIEW - here we display calendar and offer picker
  //* 2 - RESERVATION VIEW - here we display reservation
  currentFormStep = 0;
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
  placeService = inject(PlaceService);
  authService = inject(AuthService);
  router = inject(Router);

  extractParams(): Record<string, string> {
    const paramsString = this.router.url.split(';')[1]; // Get the part of URL containing parameters
    const params: Record<string, string> = {}; // Initialize an empty object to store parameters

    if (paramsString) {
      const paramsArray = paramsString.split('&'); // Split parameters into an array
      paramsArray.forEach((param) => {
        const [key, value] = param.split('='); // Split parameter into key-value pair
        params[key] = decodeURIComponent(value); // Add parameter to the object, decoding URI component
      });
    }

    return params; // Return the object containing all parameters
  }

  constructor() {
    // fetch all places
    this.placeService.getPlaceList().subscribe((places) => {
      this.placeList = places;
    });

    effect(() => {
      if (this.authService.userSignal() === null) {
        this.router.navigate(['/login']);
      }
    });
    // TODO Step form
    //* For now i will just redirect user to offer page
    //* but i plan to transform this page into step form.
    //* It will look more less like that:
    //* STEP 1 - pick an offer
    //* STEP 2 - view reservation for selected palce
    //? If user was redirected from offer page already then skip 1st step
    //? I also think about integrating ADD RESERVATION page as STEP 3 of this form
    this.placeId = this.extractParams()['place_id'];
    console.log('PLACE ID');
    console.log(this.placeId);
    console.log(this.extractParams());
    if (this.placeId) {
      this.currentFormStep++;
      const today = new Date();
      this.refreshReservations(today.getMonth(), today.getFullYear());
    }
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
    if (this.placeId === null) return;
    this.reservationService
      .getReservations({ month, year, placeId: this.placeId })
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
    //* reset everything
    this.reservationCard.disabled = true;
    this.selectedHour = null;
    //* disable/enable hour picker
    if (this.selectedDate === null) {
      this.hourPicker.disabled = true;
      return;
    }
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
    if (!this.selectedDate || !this.selectedHour || !this.placeId) return;
    this.router.navigate([
      '/add-reservation',
      {
        hour: this.selectedHour,
        day: this.selectedDate.getDate(),
        month: this.selectedDate.getMonth(),
        year: this.selectedDate.getFullYear(),
        place_id: this.placeId,
      },
    ]);
  }

  placeClicked(placeId: number) {
    //* Set current place
    this.placeId = `${placeId}`;
    this.currentFormStep++;

    //* fetch reservations for corresponding date
    const today = new Date();
    this.refreshReservations(today.getMonth(), today.getFullYear());
  }

  handleBackButtonClick() {
    this.placeId = null;
    this.currentFormStep = Math.max(0, this.currentFormStep - 1);
  }
}
