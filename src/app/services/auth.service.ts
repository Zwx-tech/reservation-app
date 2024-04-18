import { effect, inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { catchError, map, Observable } from 'rxjs';
import { Response } from 'express';
import { HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //? undefined - to be decided [initial value]
  //? null - unauthorized
  //? SafeUser - authorized
  userSignal = signal<undefined | null | SafeUser>(undefined);

  api = inject(ApiService);

  constructor() {
    //* on init check is there is any session
    effect(() => {
      if (this.userSignal() === undefined) {
        this.authenticate();
      }
    });
  }

  get token(): string {
    return localStorage.getItem('token') ?? '';
  }

  set token(value: string | null) {
    if (value === null) {
      localStorage.removeItem('token');
      return;
    }
    localStorage.setItem('token', value);
  }

  register(userData: Credentials) {
    return this.api.post('/api/auth/register', userData).pipe(
      map(
        (response) => {
          const { token, user } = response as AuthResponse;
          this.token = token;
          this.userSignal.set(user);
          console.log(this.userSignal());
        },
        catchError((err) => {
          throw err as HttpResponse<SafeUser>;
        })
      )
    );
  }

  login(userData: Credentials) {
    return this.api.post('/api/auth/login', userData).pipe(
      map(
        (response) => {
          const { token, user } = response as AuthResponse;
          this.token = token;
          this.userSignal.set(user);
          return response;
        },
        catchError((err) => {
          throw err as HttpResponse<SafeUser>;
        })
      )
    );
  }

  logOut() {
    this.userSignal.set(null);
    this.token = null;
  }

  authenticate() {
    console.log('Running token validation...');
    return this.api
      .post('/api/auth/user', { token: this.token })
      .pipe(
        map((response) => {
          const { user } = response as AuthResponse;
          this.userSignal.set(user);
          console.log(`Found user ${user}`);
          return response;
        }),
        catchError((err) => {
          this.userSignal.set(null);
          this.token = null;
          throw 'Failed to authenticate';
        })
      )
      .subscribe();
  }
}
