import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: ApiService) {}

  //? undefined - to be decided [initial value]
  //? null - unauthorized
  //? SafeUser - authorized
  userSignal = signal<undefined | null | SafeUser>(undefined);

  register(userData: Credentials) {
    return this.api
      .post('/api/auth/register', userData)
      .subscribe((response) => {
        const { token, user } = response as AuthResponse;
        console.log(token);
        localStorage.setItem('token', token);
        this.userSignal.set(user);
        console.log(localStorage.getItem('token'));
      });
  }

  authenticate() {
    const token = localStorage.getItem('token') ?? '';
    return this.api.post('/api/auth/user', { token }).subscribe((response) => {
      const { user } = response as AuthResponse;
      this.userSignal.set(user);
    });
  }
}
