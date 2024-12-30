import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApaixonadoPlanComponent } from './apaixonado-plan.component';

describe('ApaixonadoPlanComponent', () => {
  let component: ApaixonadoPlanComponent;
  let fixture: ComponentFixture<ApaixonadoPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApaixonadoPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApaixonadoPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
