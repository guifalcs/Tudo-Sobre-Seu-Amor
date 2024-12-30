import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDetailsCardComponent } from './plan-details-card.component';

describe('PlanDetailsCardComponent', () => {
  let component: PlanDetailsCardComponent;
  let fixture: ComponentFixture<PlanDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanDetailsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
