import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { ExtractTagsPipe } from '../../pipes/extract-tags.pipe';
@Component({
  selector: 'app-offer-card',
  standalone: true,
  imports: [ChipModule, DividerModule, ExtractTagsPipe],
  templateUrl: './offer-card.component.html',
  styleUrl: './offer-card.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class OfferCardComponent {
  @Input()
  offerData: Place | null = null;
}
