import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { merge, ReplaySubject } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  @Input()
  selected: Date | null = null;

  @Output()
  selectedChange = new EventEmitter<Date>();

  @Input() set viewMonth(value: number) {
    this._selectedMonth = value;
    this._selectedMonth$.next(value);
  }

  @Input() set viewYear(value: number) {
    this._selectedYear = value;
    this._selectedYear$.next(value);
  }

  calendarViewChange = new ReplaySubject<{ month: number; year: number }>();

  _selectedMonth: number | null = null;
  _selectedYear: number | null = null;
  private _selectedMonth$ = new ReplaySubject<number>();
  private _selectedYear$ = new ReplaySubject<number>();

  dayTable: Array<Date | null> = [];

  @Input()
  reservedDates: ReservationDate[] = [];

  constructor() {}

  ngOnInit() {
    merge(this._selectedMonth$, this._selectedYear$).subscribe(() => {
      this.generateDayTable();
    });

    //* If date wasn't passed as parameter, set current view to todays vi
    if (this._selectedMonth === null || this._selectedYear === null) {
      this.setTodaysView();
    }
  }

  setTodaysView() {
    this._selectedMonth = new Date().getMonth();
    this._selectedYear = new Date().getFullYear();
    this._selectedMonth$.next(this._selectedMonth);
    this._selectedYear$.next(this._selectedYear);
  }

  generateDayTable() {
    if (this._selectedYear === null || this._selectedMonth === null) return;

    //* if we pass 0 as day parameter getDate func will return last day of that previous month
    //* this also will work for december since both december and january has 31 days
    const daysInMonth = new Date(
      this._selectedYear,
      this._selectedMonth + 1,
      0
    ).getDate();

    //* then we have to calc the offset, so days of the week will be displayed correctly
    const tableDateWeekOffset = new Date(
      this._selectedYear,
      this._selectedMonth,
      1
    ).getDay();
    //* and we fill table with offset days set to null
    //* they will render as blank days
    this.dayTable = Array(tableDateWeekOffset).map((_) => null);

    //* append all days to helper list
    for (let dayOfMonth = 1; dayOfMonth <= daysInMonth; dayOfMonth++) {
      this.dayTable.push(
        new Date(this._selectedYear, this._selectedMonth, dayOfMonth)
      );
    }
  }

  isReservedDate(day: number) {
    return this.reservedDates.some((d) => d.day === day);
  }

  handleMonthChange(amount: number) {
    if (this._selectedMonth === null || this._selectedYear === null) return;
    this.viewMonth = (this._selectedMonth + 12 + amount) % 12;
    this.calendarViewChange.next({
      month: this._selectedMonth,
      year: this._selectedYear,
    });
  }

  updateSelected(day: Date) {
    this.selected = day;
    this.selectedChange.emit(this.selected);
  }
}
