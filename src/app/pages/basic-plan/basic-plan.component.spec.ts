import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicPlanComponent } from './basic-plan.component';

describe('BasicPlanComponent', () => {
  let component: BasicPlanComponent;
  let fixture: ComponentFixture<BasicPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
