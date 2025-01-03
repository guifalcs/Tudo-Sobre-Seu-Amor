import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupRelationshipComponent } from './setup-relationship.component';

describe('SetupRelationshipComponent', () => {
  let component: SetupRelationshipComponent;
  let fixture: ComponentFixture<SetupRelationshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupRelationshipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
