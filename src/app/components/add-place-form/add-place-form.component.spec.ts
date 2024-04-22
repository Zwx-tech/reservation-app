import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlaceFormComponent } from './add-place-form.component';

describe('AddPlaceFormComponent', () => {
  let component: AddPlaceFormComponent;
  let fixture: ComponentFixture<AddPlaceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPlaceFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPlaceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
