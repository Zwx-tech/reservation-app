import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferRouteComponent } from './offer-route.component';

describe('OfferRouteComponent', () => {
  let component: OfferRouteComponent;
  let fixture: ComponentFixture<OfferRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferRouteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfferRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
