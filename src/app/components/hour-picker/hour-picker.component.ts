import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-hour-picker',
  standalone: true,
  imports: [CardModule, ButtonModule, AsyncPipe],
  templateUrl: './hour-picker.component.html',
  styleUrl: './hour-picker.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HourPickerComponent {
  @Input() set reservedHours(_reservedHours: string[]) {
    this.reservedHours$.next(_reservedHours);
  }

  @Output()
  selectedHourChange = new EventEmitter<ReservationStatus<string>>();
  //* I mocked all possible hour's
  //* 'cause i didn't have enough time to implement it any better way
  reservationHours = [
    '9 AM',
    '10 AM',
    '11 AM',
    '12 AM',
    '1 PM',
    '2 PM',
    '3 PM',
    '4 PM',
  ];

  disabled = true;

  private reservedHours$ = new ReplaySubject<string[]>();

  combinedHours$ = this.reservedHours$.pipe(
    map((reservedHours) => {
      const _combinedHours = this.reservationHours.map(
        (hour) =>
          ({
            element: hour,
            status: reservedHours.includes(hour),
          } as ReservationStatus<string>)
      );
      return _combinedHours;
    })
  );

  hourButtonClicked(hour: ReservationStatus<string>) {
    this.selectedHourChange.emit(hour);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.reservedHours$.complete();
  }
}
