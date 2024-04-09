import { Component, effect, inject, ViewEncapsulation } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule,
    ButtonModule,
    MessagesModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  loginFrom = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  authService = inject(AuthService);
  router = inject(Router);

  constructor() {
    //* check for sessions
    effect(() => {
      if (this.authService.userSignal()) {
        this.router.navigate(['/']);
      }
    });
  }

  handleFormSubmit() {
    console.log(this.loginFrom.value);
    this.authService.login(this.loginFrom.value as Credentials).subscribe({
      next: () => {
        this.router.parseUrl('/');
      },
      error: (err) => {},
    });
  }
}
