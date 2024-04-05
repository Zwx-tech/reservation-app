import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';
import { CensorMailPipe } from '../../pipes/censor-mail.pipe';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-reservation-card',
  standalone: true,
  imports: [CardModule, ButtonModule, CustomDatePipe, CensorMailPipe],
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
