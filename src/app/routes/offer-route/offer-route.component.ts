import { Component } from '@angular/core';
import { PlaceListComponent } from '../../components/place-list/place-list.component';
import { MenuComponent } from '../../components/menu/menu.component';
@Component({
  selector: 'app-offer-route',
  standalone: true,
  imports: [PlaceListComponent, MenuComponent],
  templateUrl: './offer-route.component.html',
  styleUrl: './offer-route.component.scss',
})
export class OfferRouteComponent {}
