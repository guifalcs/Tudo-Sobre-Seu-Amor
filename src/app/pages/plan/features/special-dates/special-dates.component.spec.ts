import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialDatesComponent } from './special-dates.component';

describe('SpecialDatesComponent', () => {
  let component: SpecialDatesComponent;
  let fixture: ComponentFixture<SpecialDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialDatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
