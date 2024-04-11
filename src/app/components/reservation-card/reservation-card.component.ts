import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  effect,
  ViewEncapsulation,
} from '@angular/core';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';
import { CensorMailPipe } from '../../pipes/censor-mail.pipe';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AuthService } from '../../services/auth.service';
import { ReservationService } from '../../services/reservation.service';
@Component({
  selector: 'app-reservation-card',
  standalone: true,
  imports: [CardModule, ButtonModule, CustomDatePipe, CensorMailPipe],
  templateUrl: './reservation-card.component.html',
  styleUrl: './reservation-card.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ReservationCardComponent {
  @Input() reservationData: Reservation | null = null;

  @Output()
  bookEvent = new EventEmitter();
  @Output()
  onChange = new EventEmitter();
  disabled = true;

  authService = inject(AuthService);
  reservationService = inject(ReservationService);

  constructor() {
    effect(() => {
      console.log(this.authService.userSignal());
    });
  }

  handleReservationBook() {
    this.bookEvent.emit();
  }

  handleReservationCancel() {
    if (this.reservationData === null) return;
    this.reservationService
      .deleteReservation(this.reservationData.id)
      .subscribe((res) => {
        this.onChange.emit();
        console.log(res);
      });
  }

  handleReservationEdit() {}
}
