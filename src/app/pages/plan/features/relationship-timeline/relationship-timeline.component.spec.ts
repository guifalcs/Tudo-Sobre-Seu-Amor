import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipTimelineComponent } from './relationship-timeline.component';

describe('RelationshipTimelineComponent', () => {
  let component: RelationshipTimelineComponent;
  let fixture: ComponentFixture<RelationshipTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelationshipTimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelationshipTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
