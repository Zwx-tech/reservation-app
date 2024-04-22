import { Component, effect, inject, ViewEncapsulation } from '@angular/core';
import { ReservationFormComponent } from '../../components/reservation-form/reservation-form.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';
import { ReservationService } from '../../services/reservation.service';
import { CardModule } from 'primeng/card';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-add-reservation',
  standalone: true,
  imports: [ReservationFormComponent, CustomDatePipe, CardModule],
  templateUrl: './add-reservation.component.html',
  styleUrl: './add-reservation.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AddReservationComponent {
  reservationDate: ReservationDate | null = null;
  placeId: string | null = null;

  reservationService = inject(ReservationService);
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      if (this.authService.userSignal() === null) {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
    const hour = this.route.snapshot.paramMap.get('hour')!;
    const day = parseInt(this.route.snapshot.paramMap.get('day')!);
    const month = parseInt(this.route.snapshot.paramMap.get('month')!);
    const year = parseInt(this.route.snapshot.paramMap.get('year')!);
    this.placeId = this.route.snapshot.paramMap.get('place_id');
    this.reservationDate = { hour, day, month, year };
  }

  handleFormSubmit(formData: ReservationFormData) {
    if (!this.reservationDate || !this.placeId) return;
    console.log(formData);
    this.reservationService
      .bookReservation({
        ...formData,
        placeId: this.placeId,
        date: this.reservationDate,
      })
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }
}
