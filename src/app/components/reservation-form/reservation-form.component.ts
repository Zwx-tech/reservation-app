import { Component, effect, EventEmitter, inject, Output } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    CardModule,
    SelectButtonModule,
    CheckboxModule,
    InputTextareaModule,
    ButtonModule,
  ],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.scss',
})
export class ReservationFormComponent {
  @Output()
  formSubmit = new EventEmitter<ReservationFormData>();

  authService = inject(AuthService);

  //* 'cause email error message may vary, we nee a reference to email form control
  //* its not impossible to reference it without glob reference, but this will make code a little bit cleaner
  email = new FormControl({ value: '', disabled: true }, [
    Validators.required,
    Validators.email,
  ]);

  //* discountCode checkbox
  discountCodeEnabled = new FormControl(false);

  //* Form group
  reservationForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    secondName: new FormControl('', [Validators.required]),
    email: this.email,
    paymentMethod: new FormControl('', [Validators.required]),
    discountCode: new FormControl({ value: '', disabled: true }),
    additionalInformation: new FormControl(''),
  });

  emailErrorMessage = '';

  paymentMethod = [
    { label: 'cash', value: 'cash' },
    { label: 'card', value: 'card' },
  ];

  constructor() {
    //* add event that will handle email input validation
    effect(() => {
      if (this.authService.userSignal()) {
        //* We can safely use ! here
        this.email.setValue(this.authService.userSignal()!.email);
      }
    });
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());
  }

  handleFormSubmit() {
    if (this.reservationForm.value === undefined) {
      return;
    }

    this.formSubmit.emit({
      ...this.reservationForm.value,
      email: this.email.value,
    } as ReservationFormData);
  }

  updateEmailErrorMessage() {
    if (this.email.hasError('required')) {
      this.emailErrorMessage = 'This field cannot be empty';
      return;
    }
    if (this.email.hasError('email')) {
      this.emailErrorMessage = 'This is not a valid email';
      return;
    }
    this.emailErrorMessage = '';
  }

  updateDiscountField() {
    if (this.discountCodeEnabled.value) {
      this.reservationForm.controls.discountCode.enable();
      return;
    }
    this.reservationForm.controls.discountCode.disable();
  }
}
