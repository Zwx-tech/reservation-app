import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlaceRouteComponent } from './add-place-route.component';

describe('AddPlaceRouteComponent', () => {
  let component: AddPlaceRouteComponent;
  let fixture: ComponentFixture<AddPlaceRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPlaceRouteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPlaceRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
