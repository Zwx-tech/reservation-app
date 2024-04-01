import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';
import { CensorMailPipe } from '../../pipes/censor-mail.pipe';

@Component({
  selector: 'app-reservation-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CustomDatePipe, CensorMailPipe],
  templateUrl: './reservation-card.component.html',
  styleUrl: './reservation-card.component.scss',
})
export class ReservationCardComponent {
  @Input() reservationData: Reservation | null = null;

  @Output()
  bookEvent = new EventEmitter();
  disabled = true;

  handleReservationBook() {
    this.bookEvent.emit();
  }
}
