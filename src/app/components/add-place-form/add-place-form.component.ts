import { Component, inject, ViewEncapsulation } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { PlaceService } from '../../services/place.service';
import { Router } from '@angular/router';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-add-place-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    InputNumberModule,
    MultiSelectModule,
  ],
  templateUrl: './add-place-form.component.html',
  styleUrl: './add-place-form.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AddPlaceFormComponent {
  addPlaceForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    location: new FormControl<string>('', [Validators.required]),
    img_url: new FormControl<string>('', [Validators.required]),
    tags: new FormControl<string[]>([]),
    rating: new FormControl<number>(0, [Validators.required]),
    price: new FormControl<number>(0, [Validators.required]),
  });

  placeService = inject(PlaceService);
  router = inject(Router);

  possibleTags = ['Wifi', 'Cafe', 'Computers', 'Library'];
  handleFormSubmit() {
    if (this.addPlaceForm.value) {
      console.log(this.addPlaceForm.value);
      this.placeService
        .addPlace({
          name: this.addPlaceForm.controls.name.value!,
          description: this.addPlaceForm.controls.description.value!,
          location: this.addPlaceForm.controls.location.value!,
          img_url: this.addPlaceForm.controls.img_url.value!,
          tags: this.addPlaceForm.controls.tags.value!.join(';'),
          rating: this.addPlaceForm.controls.rating.value!,
          price: this.addPlaceForm.controls.price.value!,
        })
        .subscribe((res) => {
          console.log(res);
        });
    }
  }
}
