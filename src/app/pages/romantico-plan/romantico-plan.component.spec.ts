import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RomanticoPlanComponent } from './romantico-plan.component';

describe('RomanticoPlanComponent', () => {
  let component: RomanticoPlanComponent;
  let fixture: ComponentFixture<RomanticoPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RomanticoPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RomanticoPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
