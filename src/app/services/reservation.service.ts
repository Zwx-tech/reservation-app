import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Reservation } from '../../../api/db.mjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private apiService: ApiService) {}

  private parseReservationDate(date: Date): ReservationDate {
    const parsedDate = new Date(date);
    const reservationHour = parsedDate.getHours();
    return {
      day: parsedDate.getDate(),
      month: parsedDate.getMonth(),
      year: parsedDate.getFullYear(),
      hour: `${reservationHour} ${
        reservationHour >= 9 && reservationHour <= 12 ? 'AM' : 'PM'
      }`,
    };
  }

  getReservations(params: {
    month: number;
    year: number;
  }): Observable<Reservation[]> {
    return this.apiService
      .get<ReservationModel[]>(`${environment.apiUrl}/reservations/get`, {
        responseType: 'json',
        observe: 'body',
        params,
      })
      .pipe(
        map((reservations) => {
          return reservations.map(
            (reservation) =>
              ({
                id: reservation.id,
                userId: reservation.userId,
                firstName: reservation.firstName,
                secondName: reservation.secondName,
                email: reservation.email,
                discountCode: reservation.discountCode,
                paymentMethod: 'cash',
                additionalInformation: reservation.additionalInformation,
                date: this.parseReservationDate(reservation.reservationDate),
              } as Reservation)
          );
        })
      );
  }

  bookReservation(reservation: ReservationData) {
    return this.apiService.post(
      `${environment.apiUrl}/reservations/add`,
      reservation
    );
  }

  deleteReservation(reservationId: number) {
    console.log(123);
    return this.apiService.post(`${environment.apiUrl}/reservations/delete`, {
      reservationId,
    });
  }
}
