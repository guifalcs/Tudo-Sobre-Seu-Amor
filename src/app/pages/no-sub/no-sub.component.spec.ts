import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSubComponent } from './no-sub.component';

describe('NoSubComponent', () => {
  let component: NoSubComponent;
  let fixture: ComponentFixture<NoSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoSubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
