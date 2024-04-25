import {
  Component,
  effect,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { PlaceService } from '../../services/place.service';
import { AuthService } from '../../services/auth.service';
import { AddPlaceFormComponent } from '../add-place-form/add-place-form.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { OfferCardComponent } from '../offer-card/offer-card.component';
@Component({
  selector: 'app-place-list',
  standalone: true,
  imports: [
    AddPlaceFormComponent,
    OfferCardComponent,
    ButtonModule,
    DialogModule,
    CardModule,
  ],
  templateUrl: './place-list.component.html',
  styleUrl: './place-list.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PlaceListComponent {
  placeService = inject(PlaceService);
  authService = inject(AuthService);
  placeFormVisible = false;
  placeList: Place[] = [];

  _listTitle: string | null = null;

  @Input()
  set listTitle(value: string) {
    this._listTitle = value || 'Recent offers';
  }

  get listTitle() {
    return this._listTitle || 'Recent offers';
  }

  constructor() {
    this.placeService.getPlaceList().subscribe((places) => {
      this.placeList = places;
    });
  }
}
