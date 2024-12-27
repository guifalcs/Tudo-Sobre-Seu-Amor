import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoveMapComponent } from './love-map.component';

describe('LoveMapComponent', () => {
  let component: LoveMapComponent;
  let fixture: ComponentFixture<LoveMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoveMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoveMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
