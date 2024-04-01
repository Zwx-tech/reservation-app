import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
  ],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.scss',
})
export class ReservationFormComponent {
  @Output()
  formSubmit = new EventEmitter<ReservationFormData>();

  //* 'cause email error message may vary, we nee a reference to email form control
  //* its not impossible to reference it without glob reference, but this will make code a little bit cleaner
  email = new FormControl('', [Validators.required, Validators.email]);

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

  constructor() {
    //* add event that will handle email input validation
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());
  }

  handleFormSubmit() {
    if (this.reservationForm.value === undefined) {
      return;
    }
    this.formSubmit.emit(this.reservationForm.value as ReservationFormData);
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
