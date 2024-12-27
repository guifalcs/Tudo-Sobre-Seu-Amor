import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryAlbumComponent } from './memory-album.component';

describe('MemoryAlbumComponent', () => {
  let component: MemoryAlbumComponent;
  let fixture: ComponentFixture<MemoryAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoryAlbumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemoryAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
