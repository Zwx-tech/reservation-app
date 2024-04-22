import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { catchError, map, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  private api = inject(ApiService);

  constructor() {}

  getPlaceList(): Observable<Place[]> {
    return this.api
      .get<Place[]>('/api/place/getAll', {
        responseType: 'json',
        observe: 'body',
      })
      .pipe(
        catchError((err) => {
          throw err as HttpResponse<Place>;
        })
      );
  }

  addPlace(placeData: PlaceFormData) {
    return this.api.post('/api/place/add', placeData).pipe(
      catchError((err) => {
        throw err as HttpResponse<Place>;
      })
    );
  }
}
