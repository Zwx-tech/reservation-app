import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarRouteComponent } from './calendar-route.component';

describe('CalendarRouteComponent', () => {
  let component: CalendarRouteComponent;
  let fixture: ComponentFixture<CalendarRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarRouteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendarRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
