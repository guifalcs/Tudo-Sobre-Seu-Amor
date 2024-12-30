import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSummaryCardComponent } from './plan-summary-card.component';

describe('PlanSummaryCardComponent', () => {
  let component: PlanSummaryCardComponent;
  let fixture: ComponentFixture<PlanSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanSummaryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
