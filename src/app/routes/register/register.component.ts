import { Component, effect, inject, ViewEncapsulation } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule,
    ButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent {
  registerFrom = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  authService = inject(AuthService);
  router = inject(Router);

  //* Error handling
  emailInvalid = false;

  constructor() {
    //* check for sessions
    effect(() => {
      if (this.authService.userSignal()) {
        this.router.navigate(['/']);
      }
    });
  }

  handleFormSubmit() {
    this.authService
      .register(this.registerFrom.value as Credentials)
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: (err: HttpResponse<any>) => {
          if (err.status === 400) {
            //* user already exits
            this.emailInvalid = true;
          }
        },
      });
  }
}
