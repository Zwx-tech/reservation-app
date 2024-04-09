import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private apiService: ApiService) {}

  getReservations(params: {
    month: number;
    year: number;
  }): Observable<Reservation[]> {
    return this.apiService.get<Reservation[]>(
      `${environment.apiUrl}/reservations/get`,
      {
        responseType: 'json',
        observe: 'body',
        params,
      }
    );
  }

  bookReservation(reservation: ReservationData) {
    console.log('niooom');
    return this.apiService.post(
      `${environment.apiUrl}/reservations/add`,
      reservation
    );
  }
}
