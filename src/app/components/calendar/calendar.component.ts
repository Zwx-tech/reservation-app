import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MatDatepickerModule, MatCardModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  @Input()
  selected: Date | null = null;
  @Output()
  selectedChange = new EventEmitter<Date>();

  @Input() set reservedDates(reservationDates: ReservationDate[]) {
    this.colorReservedDates(reservationDates);
  }

  @ViewChild(MatCalendar) calendar!: MatCalendar<Date>;

  constructor(private reservationService: ReservationService) {}

  ngAfterViewInit() {
    // this.calendar.monthSelected.subscribe((data) => {
    //   console.log(data);
    // });
    // this.calendar.monthView.selectedChange.subscribe((data) => {
    //   console.log(data);
    // });
    this.calendar.monthView.ngOnChanges = () => {
      console.log(this.calendar.monthView._monthLabel);
    };
  }

  updateSelected() {
    if (this.selected) {
      this.selectedChange.emit(this.selected);
    }
  }

  //* I am aware that this is probably one of worst ways to override Angular Material component
  //* but i couldn't think of any better way of doing so
  // TODO find better way to override colors of specific dates
  colorReservedDates(reservationDates: ReservationDate[]) {
    // select all buttons that represents days
    const calendarCells = document.querySelectorAll('.mat-calendar-body-cell');
    // extract all reserved days for given month
    const filledDates = new Set(
      reservationDates.map((reservation) => reservation.day)
    );
    // clear all calendar dates
    calendarCells.forEach((c) => (c.className = 'mat-calendar-body-cell'));
    // add css class to all reserved dates
    for (const day of filledDates) {
      calendarCells[day - 1].classList.add('reservation-visible');
    }
  }
}
