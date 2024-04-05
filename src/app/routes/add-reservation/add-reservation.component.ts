import { Component, ViewEncapsulation } from '@angular/core';
import { ReservationFormComponent } from '../../components/reservation-form/reservation-form.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';
import { ReservationService } from '../../services/reservation.service';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-add-reservation',
  standalone: true,
  imports: [ReservationFormComponent, CustomDatePipe, CardModule],
  templateUrl: './add-reservation.component.html',
  styleUrl: './add-reservation.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AddReservationComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService
  ) {}

  reservationDate: ReservationDate | null = null;

  ngOnInit() {
    const hour = this.route.snapshot.paramMap.get('hour')!;
    const day = parseInt(this.route.snapshot.paramMap.get('day')!);
    const month = parseInt(this.route.snapshot.paramMap.get('month')!);
    const year = parseInt(this.route.snapshot.paramMap.get('year')!);
    this.reservationDate = { hour, day, month, year };
  }

  handleFormSubmit(formData: ReservationFormData) {
    if (!this.reservationDate) return;
    this.reservationService
      .bookReservation({
        ...formData,
        date: this.reservationDate,
      })
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }
}
