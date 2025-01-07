import { TestBed } from '@angular/core/testing';

import { LovemapService } from './lovemap.service';

describe('LovemapService', () => {
  let service: LovemapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LovemapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
