import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  get<T>(url: string, options: ReqOptions): Observable<T> {
    return this.httpClient.get(url, options) as Observable<T>;
  }

  post<T>(
    url: string,
    body: Object,
    options: ReqOptions = { responseType: 'json' }
  ): Observable<T> {
    return this.httpClient.post(url, body, options) as Observable<T>;
  }
}
