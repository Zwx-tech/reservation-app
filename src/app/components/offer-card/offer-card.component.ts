import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { ExtractTagsPipe } from '../../pipes/extract-tags.pipe';
import { Router } from '@angular/router';
type CardType = 'link' | 'button' | 'display';
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

  _cardType: CardType = 'link';

  @Input()
  set cardType(value: CardType) {
    this._cardType = value || 'link';
  }

  get cardType() {
    return this._cardType;
  }

  @Output()
  onClick = new EventEmitter<number>();

  router = inject(Router);

  handleCardClick() {
    if (!this.offerData) return;
    if (this.cardType === 'link') {
      this.router.navigate([
        `/reservation-list`,
        {
          place_id: this.offerData.id,
        },
      ]);
    }
    if (this.cardType === 'button') {
      this.onClick.emit(this.offerData.id);
    }
  }
}
